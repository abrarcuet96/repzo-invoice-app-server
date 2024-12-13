// Expense services:

import IExpense from './expense.interface';
import { Expense } from './expense.model';

// create expanse:
const createExpenseIntoDB = async (payload: IExpense) => {
  const result = await Expense.create(payload);
  return result;
};
// get expanse:
const getExpenseFromDB = async () => {
  const result = await Expense.find();
  return result;
};
// getSingle expanse:
const getSingleExpenseFromDB = async (expenseId: string) => {
  const result = await Expense.findOne({ expenseId });
  return result;
};
// update expanse:
const updateExpense = async (expenseId: string, payload: IExpense) => {
  const result = await Expense.findOneAndUpdate({ expenseId }, payload, {
    new: true,
  });
  return result;
};
// delete expanse:
const deleteExpense = async (expenseId: string) => {
  const result = await Expense.findOneAndDelete({ expenseId });
  return result;
};
//
export const ExpenseServices = {
  // expense:
  createExpenseIntoDB,
  getExpenseFromDB,
  getSingleExpenseFromDB,
  updateExpense,
  deleteExpense,
};
