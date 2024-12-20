import { model, Schema } from 'mongoose';
import { IPaymentInfo } from './sslPayment.interface';

const paymentInfoSchema = new Schema<IPaymentInfo>(
  {
    currency: { type: String, required: true },
    userId: { type: String, required: true },
    cus_name: { type: String, required: true },
    tranId: { type: String, required: true, unique: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'success', 'failed'],
    },
    amount: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const PaymentInfo = model<IPaymentInfo>('PaymentInfo', paymentInfoSchema);

export default PaymentInfo;
