import { z } from 'zod';
import AdminCustomerValidationSchema from '../adminCustomer/adminCustomer.validation';
import AdminExpenseValidationSchema from '../adminExpense/adminExpense.validation';
import AdminInvoiceValidationSchema from '../adminInvoice/adminInvoice.validation';
import AdminUserProfileValidationSchema from '../adminUserProfile/adminUserProfile.validation';

const AdminAccessedUserValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['user']),
  userId: z.string().optional(),
  profile: AdminUserProfileValidationSchema.optional(),
  customers: z.array(AdminCustomerValidationSchema).optional(),
  invoices: z.array(AdminInvoiceValidationSchema).optional(),
  expenses: z.array(AdminExpenseValidationSchema).optional(),
});
export default AdminAccessedUserValidationSchema;
