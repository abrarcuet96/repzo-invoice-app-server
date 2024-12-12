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
});

export default QuoteValidationSchema;
