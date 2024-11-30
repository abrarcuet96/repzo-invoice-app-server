import { z } from 'zod';

export const ItemValidationSchema = z.object({
  userId: z.string().optional(),
  itemId: z.string().optional(),
  name: z.string().min(1, 'Item name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price cannot be negative'),
  currency: z.enum(['USD', 'EUR', 'BDT', 'GBP']),
  type: z.enum(['service', 'product']),
});

export default ItemValidationSchema;
