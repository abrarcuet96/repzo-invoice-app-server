import { Request, Response } from 'express';
// import { AdminModel } from '../../admin/admin.model';
import { generateNewId } from '../../../utils/generateId';
import { Payment } from '../payment/payment.model';
import { User } from '../user-modules/user.model';
import { Invoice } from './invoice.model';
import { InvoiceServices } from './invoice.service';

const createInvoice = async (req: Request, res: Response) => {
  try {
    const invoiceData = req.body;
    const { userId } = req.params;
    invoiceData.userId = userId;
    const invoiceId = await generateNewId(Invoice, userId, 'invoiceId', 'INV');
    invoiceData.invoiceId = invoiceId;
    const paymentId = await generateNewId(Payment, userId, 'paymentId', 'PAY');
    invoiceData.payment.paymentId = paymentId;
    invoiceData.payment.userId = userId;
    const result = await InvoiceServices.createInvoiceIntoDB(invoiceData);

    await User.insertInvoiceToUserData(userId, invoiceData);

    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.insertUserInvoiceToAdminUserData(
    //   adminId,
    //   userId,
    //   invoiceData,
    // );
    res.status(200).json({
      success: true,
      message: 'Invoice is created successfully',
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

const getInvoices = async (req: Request, res: Response) => {
  try {
    const result = await InvoiceServices.getInvoiceFromDB();

    res.status(200).json({
      success: true,
      message: 'Invoices are retrieved successfully',
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
const getSingleInvoice = async (req: Request, res: Response) => {
  try {
    const { invoiceId } = req.params;
    const result = await InvoiceServices.getSingleInvoiceFromDB(invoiceId);

    res.status(200).json({
      success: true,
      message: 'Invoice is retrieved successfully',
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
const updateInvoice = async (req: Request, res: Response) => {
  try {
    const { invoiceId } = req.params;
    const body = req.body;

    const result = await InvoiceServices.updateInvoice(invoiceId, body);
    const invoiceData = await Invoice.findOne({ invoiceId });
    const userId = invoiceData?.userId;
    await User.updateUserInvoiceWhenInvoiceIsUpdated(userId, invoiceId, body);
    // admin update:
    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.updateAdminUserInvoiceWhenInvoiceIsUpdated(
    //   adminId,
    //   invoiceID,
    //   userId,
    //   body,
    // );
    res.status(200).json({
      success: true,
      message: 'Invoice is updated successfully',
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
const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const { invoiceId } = req.params;
    const invoiceData = await Invoice.findOne({ invoiceId });
    const userId = invoiceData?.userId;
    const result = await InvoiceServices.deleteInvoice(invoiceId);
    await User.deleteUserInvoiceWhenInvoiceIsDeleted(userId, invoiceId);
    // admin delete:
    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.deleteAdminUserInvoiceWhenInvoiceIsDeleted(
    //   userId,
    //   adminId,
    //   invoiceId,
    // );
    res.status(200).json({
      success: true,
      message: 'Invoice is deleted successfully',
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
export const InvoiceControllers = {
  createInvoice,
  getInvoices,
  getSingleInvoice,
  updateInvoice,
  deleteInvoice,
};
