import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateNewId } from '../../../utils/generateId';
import { User } from '../user-modules/user.model';
import { Expense } from './expense.model';
import { ExpenseServices } from './expense.service';

const createExpense = async (req: Request, res: Response) => {
  try {
    const expenseData = req.body;
    const { userId } = req.params;
    expenseData.userId = userId;
    const expenseId = uuidv4();
    expenseData.expenseId = expenseId;
    const expenseNo = await generateNewId(Expense, userId, 'expenseNo', 'EXP');
    expenseData.expenseNo = expenseNo;
    const result = await ExpenseServices.createExpenseIntoDB(expenseData);

    await User.insertExpenseToUserData(userId, expenseData);

    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.insertUserExpenseToAdminUserData(
    //   adminId,
    //   userId,
    //   expenseData,
    // );
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

    const expenseData = await Expense.findOne({ expenseId });
    const userId = expenseData?.userId;
    await User.updateUserExpenseWhenExpenseIsUpdated(userId, expenseId, body);

    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.updateAdminUserExpenseWhenExpenseIsUpdated(
    //   adminId,
    //   userId,
    //   expenseID,
    //   body,
    // );
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
    const expenseData = await Expense.findOne({ expenseId });
    const userId = expenseData?.userId;
    const result = await ExpenseServices.deleteExpense(expenseId);
    await User.deleteUserExpenseWhenExpenseIsDeleted(userId, expenseId);
    // admin delete:
    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.deleteAdminUserExpenseWhenExpenseIsDeleted(
    //   userId,
    //   adminId,
    //   expenseId,
    // );
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
