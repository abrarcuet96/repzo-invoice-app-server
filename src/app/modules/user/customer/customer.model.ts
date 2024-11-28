import { model, Schema } from 'mongoose';
import AddressSchema from '../address/address.model';
import ICustomer from './customer.interface';

const CustomerSchema = new Schema<ICustomer>({
  // id: { type: String, required: [true, 'Customer ID is required'] },
  userId: { type: String, required: false },
  customerId: { type: String, required: false },
  name: { type: String, required: [true, 'Customer name is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+@.+\..+/, 'Invalid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    match: [/^\+\d{7,15}$/, 'Invalid phone number format'],
  },
  address: { type: AddressSchema, required: false },
});
export const Customer = model<ICustomer>('Customer', CustomerSchema);
export default CustomerSchema;
