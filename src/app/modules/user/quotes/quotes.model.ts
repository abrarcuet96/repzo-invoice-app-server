import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';

import InvoiceItemSchema from '../invoiceItem/invoiceItem.model';
import IQuote from './quotes.interface';
const QuoteSchema = new Schema<IQuote>(
  {
    userId: {
      type: String,
      required: false,
    },
    customerId: {
      type: String,
      required: false,
    },
    customerNo: {
      type: String,
      required: false,
    },

    quoteId: {
      type: String,
      required: false,
    },
    quoteNo: {
      type: String,
      required: false,
    },
    quoteDate: {
      type: String,
      required: false,
    },
    expiryDate: {
      type: String,
      required: false,
    },
    items: { type: [InvoiceItemSchema], required: false },
    total: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ['accepted', 'declined', 'pending'],
      required: false,
    },
    isAccepted: {
      type: Boolean,
      required: false,
    },
    isDeclined: {
      type: Boolean,
      required: false,
    },
    isInvoiceSent: {
      type: Boolean,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'BDT', 'GBP'],
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
export const Quote = model<IQuote>('Quote', QuoteSchema);
export default QuoteSchema;
