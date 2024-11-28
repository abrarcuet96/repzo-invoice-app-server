import { Request, Response } from 'express';
import { InvoiceServices } from './invoice.service';

const createInvoice = async (req: Request, res: Response) => {
  try {
    const { invoice: invoiceData } = req.body;

    const result = await InvoiceServices.createInvoiceIntoDB(invoiceData);
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
    console.log(result);
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
    console.log(result);
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
    console.log(result);
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
    const result = await InvoiceServices.deleteInvoice(invoiceId);
    console.log(result);
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
