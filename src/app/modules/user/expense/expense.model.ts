import { model, Schema } from 'mongoose';
import IExpense from './expense.interface';

const ExpenseSchema = new Schema<IExpense>({
  id: { type: String, required: [true, 'Expense ID is required'] },
  name: { type: String, required: [true, 'Expense name is required'] },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    enum: ['USD', 'EUR', 'BDT', 'GBP'],
  },
  date: {
    type: String,
    required: [true, 'Expense date is required'],
    validate: {
      validator: (v) => !isNaN(new Date(v).getTime()),
      message: 'Invalid expense date',
    },
  },
  category: { type: String, required: [true, 'Category is required'] },
});
export const Expense = model<IExpense>('Expense', ExpenseSchema);
