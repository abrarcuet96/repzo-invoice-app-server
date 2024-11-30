import { z } from 'zod';
const AdminUserProfileValidationSchema = z.object({
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Please provide a valid phone number'),
  company: z.string().min(2).max(100).trim(),
  address: z.object({
    city: z.string().min(2).max(50).trim(),
    state: z.string().min(2).max(50).trim(),
    country: z.string().min(2).max(50).trim(),
  }),
});
export default AdminUserProfileValidationSchema;
