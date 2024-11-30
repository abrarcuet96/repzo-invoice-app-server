import { model, Schema } from 'mongoose';
import AdminCustomerSchema from '../adminCustomer/adminCustomer.model';
import AdminExpenseSchema from '../adminExpense/adminExpense.model';
import AdminInvoiceSchema from '../adminInvoice/adminInvoice.model';
import AdminUserProfileSchema from '../adminUserProfile/adminUserProfile.model';
import IAdminAccessedUser from './adminAccessedUser.interface';

const AdminAccessedUserSchema = new Schema<IAdminAccessedUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['user'], required: true },
  userId: { type: String, required: false },
  profile: { type: AdminUserProfileSchema, required: false },
  customers: { type: [AdminCustomerSchema], required: false },
  invoices: { type: [AdminInvoiceSchema], required: false },
  expenses: { type: [AdminExpenseSchema], required: false },
});
export const AdminAccessedUserModel = model<IAdminAccessedUser>(
  'AdminAccessedUserModel',
  AdminAccessedUserSchema,
);
export default AdminAccessedUserSchema;
