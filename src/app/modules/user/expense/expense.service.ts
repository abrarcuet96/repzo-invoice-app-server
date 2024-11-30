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
const getSingleExpenseFromDB = async (id: string) => {
  const result = await Expense.findById(id);
  return result;
};
// update expanse:
const updateExpense = async (id: string, payload: IExpense) => {
  const result = await Expense.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
// delete expanse:
const deleteExpense = async (id: string) => {
  const result = await Expense.findByIdAndDelete(id);
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
