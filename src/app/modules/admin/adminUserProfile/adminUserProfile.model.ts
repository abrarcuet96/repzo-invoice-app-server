import { model, Schema } from 'mongoose';
import IAdminUserProfile from './adminUserProfile.interface';

// User Profile Schema
const AdminUserProfileSchema = new Schema<IAdminUserProfile>({
  phone: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  address: {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
});
export const AdminUserProfileModel = model<IAdminUserProfile>(
  'AdminUserProfileModel',
  AdminUserProfileSchema,
);
export default AdminUserProfileSchema;
