import IInvoiceItem from '../invoiceItem/invoiceItem.interface';

interface IQuote {
  userId?: string;
  customerId?: string;
  quoteId?: string;
  quoteDate?: string;
  expiryDate?: string;
  items?: IInvoiceItem[];
  total?: number;
}
export default IQuote;
