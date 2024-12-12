import { z } from 'zod';
import AddressValidationSchema from '../address/address.validation';

const ProfileValidationSchema = z.object({
  userId: z.string().optional(), // Optional field
  profileId: z.string().optional(), // Optional field
  companyName: z.string().min(1, 'Company name is required'),
  industryName: z.string().min(1, 'Industry name is required'),
  currency: z.string().min(1, 'Currency is required'),
  timeZone: z.string().min(1, 'Time zone is required'),
  phone: z.string().min(1, 'Phone is required'),
  company: z.string().min(1, 'Company is required'),
  address: AddressValidationSchema, // Embedding the AddressSchema
});

export default ProfileValidationSchema;
