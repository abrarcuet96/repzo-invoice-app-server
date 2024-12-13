import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';
import IPayment from './payment.interface';
const PaymentSchema = new Schema<IPayment>(
  {
    userId: { type: String, required: false },
    paymentId: { type: String, required: false },
    // method: {
    //   type: String,
    //   required: true,
    //   enum: ['credit_card', 'paypal', 'bank_transfer', 'cash'],
    // },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['sent', 'recieved'],
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
export const Payment = model<IPayment>('Payment', PaymentSchema);
export default PaymentSchema;
