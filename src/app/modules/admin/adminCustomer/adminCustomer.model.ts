import { model, Schema } from 'mongoose';
import IAdminCustomer from './adminCustomer.interface';

const AdminCustomerSchema = new Schema({
  customerId: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: {
    city: { type: String },
  },
});
export const AdminCustomerModel = model<IAdminCustomer>(
  'AdminCustomerModel',
  AdminCustomerSchema,
);
export default AdminCustomerSchema;
