import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';
import InvoiceItemSchema from '../invoiceItem/invoiceItem.model';
import PaymentSchema from '../payment/payment.model';
import IInvoice from './invoice.interface';
const InvoiceSchema = new Schema<IInvoice>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
        ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');

        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
        ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');

        return ret;
      },
    },
  },
);

export const Invoice = model<IInvoice>('Invoice', InvoiceSchema);
export default InvoiceSchema;
