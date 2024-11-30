import { model, Schema } from 'mongoose';
import IInvoiceItem from './invoiceItem.interface';

const InvoiceItemSchema = new Schema<IInvoiceItem>({
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
export const InvoiceItem = model<IInvoiceItem>(
  'InvoiceItem',
  InvoiceItemSchema,
);
export default InvoiceItemSchema;
