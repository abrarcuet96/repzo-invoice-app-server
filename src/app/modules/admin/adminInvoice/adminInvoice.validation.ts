import { z } from 'zod';
// Admin Invoice Schema Validation
const AdminInvoiceValidationSchema = z.object({
    invoiceId: z.string().optional(),
    customerId: z.string().optional(),
    total: z.number().min(0, 'Total amount cannot be negative'),
    currency: z.enum(['BDT', 'USD', 'EUR']).default('BDT'),
    status: z.enum(['paid', 'unpaid', 'overdue']).default('unpaid'),
    dueDate: z.string(),
  });
  export default AdminInvoiceValidationSchema;