import { z } from 'zod';

export const PaymentValidationSchema = z.object({
  userId: z.string().optional(),
  paymentId: z.string().optional(),
  // method: z.enum(['credit_card', 'paypal', 'bank_transfer', 'cash']),
  amount: z.number().min(0, 'Amount cannot be negative'),
  date: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: 'Invalid payment date',
  }),
  status: z.enum(['sent', 'recieve']),
});

export default PaymentValidationSchema;
