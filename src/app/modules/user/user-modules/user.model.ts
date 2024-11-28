import { model, Schema } from 'mongoose';
import flattenObject from '../../../config/objectFlattening';
import ProfileSchema from '../profile/profile.model';
import IUser, { UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>({
  name: { type: String, required: [true, 'Name is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+@.+\..+/, 'Invalid email address'],
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['user', 'admin', 'manager'],
  },
  profile: { type: ProfileSchema, required: false },
});
UserSchema.statics.insertProfileToUserData = async function (
  userId,
  profileData,
) {
  await this.findByIdAndUpdate(
    { _id: userId },
    {
      $set: { profile: profileData },
    },
  );
};
UserSchema.statics.updateUserProfileWhenProfieIsUpdated = async function (
  userId,
  body,
) {
  const userUpdateData = flattenObject(body, 'profile');
  await this.findOneAndUpdate({ _id: userId }, { $set: userUpdateData });
};

export const User = model<IUser, UserModel>('User', UserSchema);
