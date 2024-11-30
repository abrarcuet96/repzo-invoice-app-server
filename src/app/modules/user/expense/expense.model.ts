import { model, Schema } from 'mongoose';
import IExpense from './expense.interface';

const ExpenseSchema = new Schema<IExpense>({
  // id: { type: String, required: [true, 'Expense ID is required'] },
  userId: { type: String, required: false },
  expenseId: { type: String, required: false },
  name: { type: String, required: true },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'BDT', 'GBP'],
  },
  date: {
    type: String,
    required: true,
  },
  category: { type: String, required: true },
});
export const Expense = model<IExpense>('Expense', ExpenseSchema);
export default ExpenseSchema;
