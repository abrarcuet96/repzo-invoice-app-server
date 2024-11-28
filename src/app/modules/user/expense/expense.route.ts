import express from 'express';
import { ExpenseControllers } from './expense.controller';
const expenseRouter = express.Router();

expenseRouter.post('/', ExpenseControllers.createExpense);
expenseRouter.get('/:expenseId', ExpenseControllers.getSingleExpense);
expenseRouter.get('/', ExpenseControllers.getExpenses);
expenseRouter.put('/:expenseId', ExpenseControllers.updateExpense);
expenseRouter.delete('/:expenseId', ExpenseControllers.deleteExpense);

export const ExpenseRoutes = expenseRouter;
