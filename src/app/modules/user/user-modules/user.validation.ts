import { z } from 'zod';
import CustomerValidationSchema from '../customer/customer.validation';
import ExpenseValidationSchema from '../expense/expense.validation';
import InvoiceValidationSchema from '../invoice/invoice.validation';
import ItemValidationSchema from '../item/item.validation';
import NotificationValidationSchema from '../notification/notification.validation';
import ProfileValidationSchema from '../profile/profile.validation';
import QuoteValidationSchema from '../quotes/quotes.validation';
import SettingsValidationSchema from '../settings/settings.validation';

export const UserValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().optional(),
  profileImage: z.string().min(1, 'Image is required'),
  role: z.enum(['user', 'customer']),
  profile: ProfileValidationSchema.optional(),
  customers: z.array(CustomerValidationSchema).optional(),
  items: z.array(ItemValidationSchema).optional(),
  invoices: z.array(InvoiceValidationSchema).optional(),
  quotes: z.array(QuoteValidationSchema).optional(),
  expenses: z.array(ExpenseValidationSchema).optional(),
  notifications: z.array(NotificationValidationSchema).optional(),
  settings: SettingsValidationSchema.optional(),
  template: z
    .enum(['standard', 'continental', 'compact'])
    .default('standard')
    .optional(),
});

export default UserValidationSchema;
