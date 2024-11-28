import { Request, Response } from 'express';
import { PaymentServices } from './payment.service';

const createPayment = async (req: Request, res: Response) => {
  try {
    const { payment: paymentData } = req.body;

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
    console.log(result);
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
    console.log(result);
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
    console.log(result);
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
    console.log(result);
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
