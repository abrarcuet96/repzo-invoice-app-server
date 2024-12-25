import IInvoiceItem from '../invoiceItem/invoiceItem.interface';

interface IQuote {
  userId?: string;
  customerId?: string;
  customerNo?: string;
  quoteId?: string;
  quoteNo?: string;
  quoteDate?: string;
  expiryDate?: string;
  items?: IInvoiceItem[];
  total?: number;
  status?: string;
  isAccepted?: boolean;
  isDeclined?: boolean;
  isInvoiceSent?: boolean;
  isDeleted?: boolean;
  message?: string;
  currency: string;
}
export default IQuote;
