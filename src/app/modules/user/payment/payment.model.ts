import { model, Schema } from 'mongoose';
import IPayment from './payment.interface';

const PaymentSchema = new Schema<IPayment>({
  // id: { type: String, required: [true, 'Payment ID is required'] },
  userId: { type: String, required: false },
  method: {
    type: String,
    required: true,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'cash'],
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
export const Payment = model<IPayment>('Payment', PaymentSchema);
export default PaymentSchema;
