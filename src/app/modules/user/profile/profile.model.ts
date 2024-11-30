import { model, Schema } from 'mongoose';
import AddressSchema from '../address/address.model';
import IProfile from './profile.interface';

const ProfileSchema = new Schema<IProfile>({
  userId: { type: String, required: false },
  profileId: { type: String, required: false },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    match: [/^0(13|14|15|16|17|18|19)\d{8}$/, 'Invalid phone number format'],
  },
  company: { type: String, required: [true, 'Company name is required'] },
  address: { type: AddressSchema, required: true },
});

export const Profile = model<IProfile>('Profile', ProfileSchema);
export default ProfileSchema;
