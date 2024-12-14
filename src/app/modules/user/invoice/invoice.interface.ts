import IInvoiceItem from '../invoiceItem/invoiceItem.interface';
import IPayment from '../payment/payment.interface';

export default interface IInvoice {
  userId?: string;
  customerId?: string;
  invoiceId?: string;
  issuedDate: string;
  dueDate: string;
  items?: IInvoiceItem[];
  status: string;
  total?: number;
  currency: string;
  payment?: IPayment;
}
