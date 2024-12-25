import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateNewId } from '../../../utils/generateId';
import { Payment } from './payment.model';
import { PaymentServices } from './payment.service';
const createPayment = async (req: Request, res: Response) => {
  try {
    const paymentData = req.body;
    const { userId } = req.params;
    paymentData.userId = userId;
    const paymentId = uuidv4();
    const paymentNo = await generateNewId(Payment, userId, 'paymentNo', 'PAY');
    paymentData.paymentNo = paymentNo;
    paymentData.paymentId = paymentId;
    const result = await PaymentServices.createPaymentIntoDB(paymentData);
    res.status(200).json({
      success: true,
      message: 'Payment is created successfully',
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

const getPayments = async (req: Request, res: Response) => {
  try {
    const result = await PaymentServices.getPaymentFromDB();
    res.status(200).json({
      success: true,
      message: 'Payments are retrieved successfully',
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
const getSinglePayment = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const result = await PaymentServices.getSinglePaymentFromDB(paymentId);
    res.status(200).json({
      success: true,
      message: 'Payment is retrieved successfully',
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
const updatePayment = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const body = req.body;
    const result = await PaymentServices.updatePayment(paymentId, body);
    res.status(200).json({
      success: true,
      message: 'Payment is updated successfully',
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
const deletePayment = async (req: Request, res: Response) => {
  try {
    const { paymentId } = req.params;
    const result = await PaymentServices.deletePayment(paymentId);
    res.status(200).json({
      success: true,
      message: 'Payment is deleted successfully',
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
export const PaymentControllers = {
  createPayment,
  getPayments,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
