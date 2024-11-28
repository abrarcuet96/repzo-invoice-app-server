// Invoice services:

import IInvoice from './invoice.interface';
import { Invoice } from './invoice.model';

// create invoice:
const createInvoiceIntoDB = async (payload: IInvoice) => {
  const result = await Invoice.create(payload);
  return result;
};
// get invoice:
const getInvoiceFromDB = async () => {
  const result = await Invoice.find();
  return result;
};
// getSingle invoice:
const getSingleInvoiceFromDB = async (id: string) => {
  const result = await Invoice.findById({ id });
  return result;
};
// update invoice:
const updateInvoice = async (id: string, payload: IInvoice) => {
  const result = await Invoice.findByIdAndUpdate(id, payload);
  return result;
};
// delete invoice:
const deleteInvoice = async (id: string) => {
  const result = await Invoice.findByIdAndDelete(id);
  return result;
};
//
export const InvoiceServices = {
  // invoice:
  createInvoiceIntoDB,
  getInvoiceFromDB,
  getSingleInvoiceFromDB,
  updateInvoice,
  deleteInvoice,
};
