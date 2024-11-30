import { model, Schema } from 'mongoose';
import IAdminInvoice from './adminInvoice.interface';

// Invoice Schema
const AdminInvoiceSchema = new Schema<IAdminInvoice>({
  invoiceId: { type: String, required: false },
  customerId: { type: String, required: false },
  total: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: ['BDT', 'USD', 'EUR'],
    default: 'BDT',
  },
  status: {
    type: String,
    enum: ['paid', 'unpaid', 'overdue'],
    required: true,
    default: 'unpaid',
  },
  dueDate: {
    type: String,
    required: true,
  },
});
export const AdminInvoiceModel = model<IAdminInvoice>(
  'AdminInvoiceModel',
  AdminInvoiceSchema,
);
export default AdminInvoiceSchema;
