import { z } from 'zod';

export const SettingsValidationSchema = z.object({
  currency: z.enum(['USD', 'EUR', 'BDT', 'GBP']),
  taxRate: z
    .number()
    .min(0, 'Tax rate cannot be negative')
    .max(100, 'Tax rate cannot exceed 100'),
  language: z.string().min(1, 'Language is required'),
});

export default SettingsValidationSchema;
