import { z } from 'zod';
// Admin Expense Schema Validation
const AdminExpenseValidationSchema = z.object({
  expenseId: z.string().optional(),
  name: z.string().min(2).max(100).trim(),
  amount: z.number().min(0, 'Expense amount cannot be negative'),
  currency: z.enum(['BDT', 'USD', 'EUR']).default('BDT'),
  date: z.string(),
  category: z.string().min(2).max(50).trim(),
});
export default AdminExpenseValidationSchema;
