import { z } from 'zod';
import AddressValidationSchema from '../address/address.validation';

export const CustomerValidationSchema = z.object({
  userId: z.string().optional(),
  customerId: z.string().optional(),
  name: z.string().min(1, 'Customer name is required'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^\+\d{7,15}$/, 'Invalid phone number format')
    .min(1, 'Phone is required'),
  address: AddressValidationSchema.optional(),
});

export default CustomerValidationSchema;
