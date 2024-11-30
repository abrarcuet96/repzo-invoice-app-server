import { model, Schema } from 'mongoose';
import InvoiceItemSchema from '../invoiceItem/invoiceItem.model';
import PaymentSchema from '../payment/payment.model';
import IInvoice from './invoice.interface';

const InvoiceSchema = new Schema<IInvoice>({
  // id: { type: String, required: [true, 'Invoice ID is required'] },
  invoiceId: { type: String, required: false },
  userId: { type: String, required: false },
  customerId: { type: String, required: true },
  items: { type: [InvoiceItemSchema], required: false },
  total: {
    type: Number,
    required: false,
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'BDT', 'GBP'],
  },
  status: {
    type: String,
    required: true,
    enum: ['paid', 'unpaid', 'overdue'],
  },
  issuedDate: { type: String, required: true },
  dueDate: { type: String, required: true },
  payments: { type: [PaymentSchema], required: false },
});

export const Invoice = model<IInvoice>('Invoice', InvoiceSchema);
export default InvoiceSchema;
