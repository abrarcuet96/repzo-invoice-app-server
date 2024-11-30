import { model, Schema } from 'mongoose';
import AddressSchema from '../address/address.model';
import IProfile from './profile.interface';

const ProfileSchema = new Schema<IProfile>({
  userId: { type: String, required: false },
  profileId: { type: String, required: false },
  phone: {
    type: String,
    required: true,
  },
  company: { type: String, required: true },
  address: { type: AddressSchema, required: true },
});

export const Profile = model<IProfile>('Profile', ProfileSchema);
export default ProfileSchema;
