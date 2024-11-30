import IAdminCustomer from '../adminCustomer/adminCustomer.interface';
import IAdminExpense from '../adminExpense/adminExpense.interface';
import IAdminInvoice from '../adminInvoice/adminInvoice.interface';
import IAdminUserProfile from '../adminUserProfile/adminUserProfile.interface';

export default interface IAdminAccessedUser {
  name: string;
  email: string;
  role: 'user';
  userId?: string;
  profile?: IAdminUserProfile;
  customers?: IAdminCustomer[];
  invoices?: IAdminInvoice[];
  expenses?: IAdminExpense[];
}
