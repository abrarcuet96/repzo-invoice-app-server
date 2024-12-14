import { z } from 'zod';

export const PaymentValidationSchema = z.object({
  userId: z.string().optional(),
  paymentId: z.string().optional(),
  // method: z.enum(['credit_card', 'paypal', 'bank_transfer', 'cash']),
  amount: z.number().min(0, 'Amount cannot be negative'),
  status: z.enum(['pending', 'recieve']),
});

export default PaymentValidationSchema;
