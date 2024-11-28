import { model, Schema } from 'mongoose';
import InvoiceItemSchema from '../invoiceItem/invoiceItem.model';
import PaymentSchema from '../payment/payment.model';
import IInvoice from './invoice.interface';

const InvoiceSchema = new Schema<IInvoice>({
  // id: { type: String, required: [true, 'Invoice ID is required'] },
  userId: { type: String, required: false },
  customerId: { type: String, required: [true, 'Customer ID is required'] },
  items: { type: [InvoiceItemSchema], required: true },
  total: {
    type: Number,
    required: [true, 'Total is required'],
    min: [0, 'Total cannot be negative'],
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    enum: ['USD', 'EUR', 'BDT', 'GBP'],
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['paid', 'unpaid', 'overdue'],
  },
  issuedDate: { type: String, required: [true, 'Issued date is required'] },
  dueDate: { type: String, required: [true, 'Due date is required'] },
  payments: { type: [PaymentSchema], required: true },
});

export const Invoice = model<IInvoice>('Invoice', InvoiceSchema);
export default InvoiceSchema;
