import { z } from 'zod';

export const ExpenseValidationSchema = z.object({
  userId: z.string().optional(),
  expenseId: z.string().optional(),
  name: z.string().min(1, 'Expense name is required'),
  amount: z.number().min(0, 'Amount cannot be negative'),
  currency: z.enum(['USD', 'EUR', 'BDT', 'GBP']),
  date: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: 'Invalid expense date',
  }),
  category: z.string().min(1, 'Category is required'),
});

export default ExpenseValidationSchema;
