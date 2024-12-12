import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';
import AddressSchema from '../address/address.model';
import ICustomer from './customer.interface';
const CustomerSchema = new Schema<ICustomer>(
  {
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
export const Customer = model<ICustomer>('Customer', CustomerSchema);
export default CustomerSchema;
