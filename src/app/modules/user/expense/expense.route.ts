import express from 'express';
import { ExpenseControllers } from './expense.controller';
const expenseRouter = express.Router();

expenseRouter.post('/:userId', ExpenseControllers.createExpense);
expenseRouter.get('/:expenseId', ExpenseControllers.getSingleExpense);
expenseRouter.put('/:expenseId', ExpenseControllers.updateExpense);
expenseRouter.delete('/:expenseId', ExpenseControllers.deleteExpense);
expenseRouter.get('/', ExpenseControllers.getExpenses);

export const ExpenseRoutes = expenseRouter;
