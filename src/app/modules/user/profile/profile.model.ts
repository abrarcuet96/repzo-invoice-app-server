import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';
import AddressSchema from '../address/address.model';
import IProfile from './profile.interface';
const ProfileSchema = new Schema<IProfile>(
  {
    userId: { type: String, required: false }, // Optional
    profileId: { type: String, required: false }, // Optional
    companyName: { type: String, required: true },
    industryName: { type: String, required: true },
    currency: { type: String, required: true },
    timeZone: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    address: { type: AddressSchema, required: true }, // Referencing AddressSchema
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
        ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');

        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
        ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');

        return ret;
      },
    },
  },
);

export const Profile = model<IProfile>('Profile', ProfileSchema);
export default ProfileSchema;
