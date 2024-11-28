import { model, Schema } from 'mongoose';
import IPayment from './payment.interface';

const PaymentSchema = new Schema<IPayment>({
  id: { type: String, required: [true, 'Payment ID is required'] },
  method: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['credit_card', 'paypal', 'bank_transfer', 'cash'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  date: {
    type: String,
    required: [true, 'Payment date is required'],
    validate: {
      validator: (v) => !isNaN(new Date(v).getTime()),
      message: 'Invalid payment date',
    },
  },
});
export const Payment = model<IPayment>('Payment', PaymentSchema);
export default PaymentSchema;
