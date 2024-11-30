import { z } from 'zod';
// Admin Customer Schema Validation
const AdminCustomerValidationSchema = z.object({
  customerId: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.object({
    city: z.string(),
  }),
});
export default AdminCustomerValidationSchema;
