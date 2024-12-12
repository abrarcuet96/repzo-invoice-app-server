import { Request, Response } from 'express';
import { User } from '../user-modules/user.model';
import { Quote } from './quotes.model';
import { QuoteServices } from './quotes.service';

const createQuote = async (req: Request, res: Response) => {
  try {
    const quoteData = req.body;
    const { userId } = req.params;
    quoteData.userId = userId;
    const result = await QuoteServices.createQuoteIntoDB(quoteData);
    const quoteId = result._id.toString();
    quoteData.quoteId = quoteId;
    quoteData.quoteDate = new Date();

    await User.insertQuoteToUserData(userId, quoteData);

    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.insertUserquoteToAdminUserData(
    //   adminId,
    //   userId,
    //   quoteData,
    // );
    res.status(200).json({
      success: true,
      message: 'Quote is created successfully',
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

const getQuotes = async (req: Request, res: Response) => {
  try {
    const result = await QuoteServices.getQuoteFromDB();

    res.status(200).json({
      success: true,
      message: 'Quotes are retrieved successfully',
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
const getSingleQuote = async (req: Request, res: Response) => {
  try {
    const { quoteId } = req.params;
    const result = await QuoteServices.getSingleQuoteFromDB(quoteId);

    res.status(200).json({
      success: true,
      message: 'Quote is retrieved successfully',
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
const updateQuote = async (req: Request, res: Response) => {
  try {
    const { quoteId } = req.params;
    const body = req.body;

    const result = await QuoteServices.updateQuote(quoteId, body);
    const quoteData = await Quote.findById(quoteId);
    const userId = quoteData?.userId;
    const quoteID = quoteData?._id?.toString();
    await User.updateUserQuoteWhenQuoteIsUpdated(userId, quoteID, body);
    // admin update:
    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.updateAdminUserquoteWhenquoteIsUpdated(
    //   adminId,
    //   quoteID,
    //   userId,
    //   body,
    // );
    res.status(200).json({
      success: true,
      message: 'Quote is updated successfully',
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
const deleteQuote = async (req: Request, res: Response) => {
  try {
    const { quoteId } = req.params;
    const quoteData = await Quote.findById(quoteId);
    const userId = quoteData?.userId;
    const result = await QuoteServices.deleteQuote(quoteId);
    await User.deleteUserQuoteWhenQuoteIsDeleted(userId, quoteId);
    // admin delete:
    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.deleteAdminUserquoteWhenquoteIsDeleted(
    //   userId,
    //   adminId,
    //   quoteId,
    // );
    res.status(200).json({
      success: true,
      message: 'Quote is deleted successfully',
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
export const QuoteControllers = {
  createQuote,
  getQuotes,
  getSingleQuote,
  updateQuote,
  deleteQuote,
};
