export default interface IAdminInvoice {
  invoiceId?: string;
  customerId?: string;
  total: number;
  currency: string;
  status: 'paid' | 'unpaid' | 'overdue';
  dueDate: string; // ISO date string
}
