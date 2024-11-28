// InvoiceItem services:

import IInvoiceItem from './invoiceItem.interface';
import { InvoiceItem } from './invoiceItem.model';

// create invoiceItem:
const createInvoiceItemIntoDB = async (payload: IInvoiceItem) => {
  const result = await InvoiceItem.create(payload);
  return result;
};
// get invoiceItem:
const getInvoiceItemFromDB = async () => {
  const result = await InvoiceItem.find();
  return result;
};
// getSingle invoiceItem:
const getSingleInvoiceItemFromDB = async (id: string) => {
  const result = await InvoiceItem.findById({ id });
  return result;
};
// update invoiceItem:
const updateInvoiceItem = async (id: string, payload: IInvoiceItem) => {
  const result = await InvoiceItem.findByIdAndUpdate(id, payload);
  return result;
};
// delete invoiceItem:
const deleteInvoiceItem = async (id: string) => {
  const result = await InvoiceItem.findByIdAndDelete(id);
  return result;
};
//
export const InvoiceItemServices = {
  // invoice item:
  createInvoiceItemIntoDB,
  getInvoiceItemFromDB,
  getSingleInvoiceItemFromDB,
  updateInvoiceItem,
  deleteInvoiceItem,
};
