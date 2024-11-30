import { z } from 'zod';
import AddressValidationSchema from '../address/address.validation';

export const ProfileValidationSchema = z.object({
  userId: z.string().optional(),
  profileId: z.string().optional(),
  phone: z
    .string()
    .regex(/^0(13|14|15|16|17|18|19)\d{8}$/, 'Invalid phone number format'),
  company: z.string().min(1, 'Company name is required'),
  address: AddressValidationSchema,
});

export default ProfileValidationSchema;
