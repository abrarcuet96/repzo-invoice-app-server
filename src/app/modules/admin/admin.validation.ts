import { z } from 'zod';
import AdminAccessedUserValidationSchema from './adminAccessedUser/adminAccessedUser.validation';
// Main Admin Schema Validation
const AdminValidationSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email(),
  role: z.enum(['admin']),
  giveAccessAs: z.enum(['user', 'admin']).optional(),
  accessedUser: z.array(AdminAccessedUserValidationSchema),
});

export default AdminValidationSchema;
