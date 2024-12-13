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
const getSingleInvoiceFromDB = async (invoiceId: string) => {
  const result = await Invoice.findOne({ invoiceId });
  return result;
};
// update invoice:
const updateInvoice = async (invoiceId: string, payload: Partial<IInvoice>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setPayload: Record<string, any> = {};

  for (const key in payload) {
    // Ensure TypeScript knows key is a valid key of IInvoice
    if (key in payload && payload[key as keyof IInvoice] !== undefined) {
      setPayload[key] = payload[key as keyof IInvoice];
    }
  }
  const result = await Invoice.findOneAndUpdate(
    { invoiceId },
    { $set: setPayload },
    { new: true },
  );

  return result;
};
// delete invoice:
const deleteInvoice = async (invoiceId: string) => {
  const result = await Invoice.findOneAndDelete({ invoiceId });
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
