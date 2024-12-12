import { z } from 'zod';

export const InvoiceItemValidationSchema = z.object({
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  name: z.string().optional(),
  price: z.number().min(0, 'Price cannot be negative'),
});

export default InvoiceItemValidationSchema;
