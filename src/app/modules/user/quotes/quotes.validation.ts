import { z } from 'zod';
import InvoiceItemValidationSchema from '../invoiceItem/invoiceItem.validation';

const QuoteValidationSchema = z.object({
  userId: z.string().optional(),
  customerId: z.string().optional(),
  quoteId: z.string().optional(),
  quoteDate: z.string().optional(),
  expiryDate: z.string().optional(),
  items: z.array(InvoiceItemValidationSchema).optional(),
  total: z.number().optional(),
  status: z.enum(['accepted', 'declined', 'pending']),
  isAccepted: z.boolean().optional(),
  isDeclined: z.boolean().optional(),
  isInvoiceSent: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  message: z.string().optional(),
  currency: z.enum(['USD', 'EUR', 'BDT', 'GBP']),
});

export default QuoteValidationSchema;
