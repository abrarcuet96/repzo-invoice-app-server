import { model, Schema } from 'mongoose';
import IAdminExpense from './adminExpense.interface';

const AdminExpenseSchema = new Schema<IAdminExpense>({
  expenseId: { type: String, required: false },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: ['BDT', 'USD', 'EUR'],
    default: 'BDT',
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
export const AdminExpenseModel = model<IAdminExpense>(
  'AdminExpenseModel',
  AdminExpenseSchema,
);
export default AdminExpenseSchema;
