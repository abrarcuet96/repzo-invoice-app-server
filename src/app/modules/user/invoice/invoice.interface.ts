import IInvoiceItem from '../invoiceItem/invoiceItem.interface';
import IPayment from '../payment/payment.interface';

export default interface IInvoice {
  id: string;
  customerId: string;
  items: IInvoiceItem[];
  total: number;
  currency: string;
  status: string;
  issuedDate: string;
  dueDate: string;
  payments: IPayment[];
}
