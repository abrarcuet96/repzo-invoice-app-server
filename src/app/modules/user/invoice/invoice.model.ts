import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';
import InvoiceItemSchema from '../invoiceItem/invoiceItem.model';
import PaymentSchema from '../payment/payment.model';
import IInvoice from './invoice.interface';
const InvoiceSchema = new Schema<IInvoice>(
  {
    userId: { type: String, required: false },
    customerId: { type: String, required: true },
    invoiceId: { type: String, required: false },
    issuedDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    items: { type: [InvoiceItemSchema], required: false },
    status: {
      type: String,
      required: true,
      enum: ['paid', 'unpaid'],
    },
    total: {
      type: Number,
      required: false,
    },
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'BDT', 'GBP'],
    },
    payment: { type: PaymentSchema, required: false },
    isDeleted: {
      type: Boolean,
      required: false,
    },
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
