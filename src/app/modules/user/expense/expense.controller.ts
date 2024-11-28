import { Request, Response } from 'express';
import { ExpenseServices } from './expense.service';

const createExpense = async (req: Request, res: Response) => {
  try {
    const { expense: expenseData } = req.body;

    const result = await ExpenseServices.createExpenseIntoDB(expenseData);
    res.status(200).json({
      success: true,
      message: 'Expense is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getExpenses = async (req: Request, res: Response) => {
  try {
    const result = await ExpenseServices.getExpenseFromDB();
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Expenses are retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const getSingleExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const result = await ExpenseServices.getSingleExpenseFromDB(expenseId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Expense is retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const updateExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const body = req.body;
    const result = await ExpenseServices.updateExpense(expenseId, body);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Expense is updated successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { expenseId } = req.params;
    const result = await ExpenseServices.deleteExpense(expenseId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Expense is deleted successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
export const ExpenseControllers = {
  createExpense,
  getExpenses,
  getSingleExpense,
  updateExpense,
  deleteExpense,
};
