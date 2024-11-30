import { z } from 'zod';
import InvoiceItemValidationSchema from '../invoiceItem/invoiceItem.validation';
import PaymentValidationSchema from '../payment/payment.validation';

export const InvoiceValidationSchema = z.object({
  invoiceId: z.string().optional(),
  userId: z.string().optional(),
  customerId: z.string().min(1, 'Customer ID is required'),
  items: z.array(InvoiceItemValidationSchema).optional(),
  total: z.number().min(0, 'Total cannot be negative').optional(),
  currency: z.enum(['USD', 'EUR', 'BDT', 'GBP']),
  status: z.enum(['paid', 'unpaid', 'overdue']),
  issuedDate: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: 'Invalid issued date',
  }),
  dueDate: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: 'Invalid due date',
  }),
  payments: z.array(PaymentValidationSchema).optional(),
});

export default InvoiceValidationSchema;
