import { z } from 'zod';

export const AddressValidationSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z
    .string()
    .regex(/^\d{4,6}$/, 'Invalid postal code')
    .min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
});

export default AddressValidationSchema;
