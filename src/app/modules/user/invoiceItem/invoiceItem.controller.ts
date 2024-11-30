import { Request, Response } from 'express';
import { InvoiceItemServices } from './invoiceItem.service';

const createInvoiceItem = async (req: Request, res: Response) => {
  try {
    const { invoiceItem: invoiceItemData } = req.body;

    const result =
      await InvoiceItemServices.createInvoiceItemIntoDB(invoiceItemData);
    res.status(200).json({
      success: true,
      message: 'InvoiceItem is created successfully',
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

const getInvoiceItems = async (req: Request, res: Response) => {
  try {
    const result = await InvoiceItemServices.getInvoiceItemFromDB();
    res.status(200).json({
      success: true,
      message: 'InvoiceItems are retrieved successfully',
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
const getSingleInvoiceItem = async (req: Request, res: Response) => {
  try {
    const { invoiceItemId } = req.params;
    const result =
      await InvoiceItemServices.getSingleInvoiceItemFromDB(invoiceItemId);
    res.status(200).json({
      success: true,
      message: 'InvoiceItem is retrieved successfully',
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
const updateInvoiceItem = async (req: Request, res: Response) => {
  try {
    const { invoiceItemId } = req.params;
    const body = req.body;
    const result = await InvoiceItemServices.updateInvoiceItem(
      invoiceItemId,
      body,
    );
    res.status(200).json({
      success: true,
      message: 'InvoiceItem is updated successfully',
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
const deleteInvoiceItem = async (req: Request, res: Response) => {
  try {
    const { invoiceItemId } = req.params;
    const result = await InvoiceItemServices.deleteInvoiceItem(invoiceItemId);
    res.status(200).json({
      success: true,
      message: 'InvoiceItem is deleted successfully',
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
export const InvoiceItemControllers = {
  createInvoiceItem,
  getInvoiceItems,
  getSingleInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
};
