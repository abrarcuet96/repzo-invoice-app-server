import { model, Schema } from 'mongoose';
import IInvoiceItem from './invoiceItem.interface';

const InvoiceItemSchema = new Schema<IInvoiceItem>({
  itemId: { type: String, required: [true, 'Item ID is required'] },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
});
export const InvoiceItem = model<IInvoiceItem>(
  'InvoiceItem',
  InvoiceItemSchema,
);
export default InvoiceItemSchema;
