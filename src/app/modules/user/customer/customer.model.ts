import { model, Schema } from 'mongoose';
import AddressSchema from '../address/address.model';
import ICustomer from './customer.interface';

const CustomerSchema = new Schema<ICustomer>({
  // id: { type: String, required: [true, 'Customer ID is required'] },
  userId: { type: String, required: false },
  customerId: { type: String, required: false },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: { type: AddressSchema, required: false },
});
export const Customer = model<ICustomer>('Customer', CustomerSchema);
export default CustomerSchema;
