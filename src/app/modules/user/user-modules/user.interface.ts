import { Model } from 'mongoose';
import ICustomer from '../customer/customer.interface';
import IExpense from '../expense/expense.interface';
import IInvoice from '../invoice/invoice.interface';
import IItem from '../item/item.interface';
import INotification from '../notification/notification.interface';
import IProfile from '../profile/profile.interface';
import ISettings from '../settings/settings.interface';

interface IUser {
  name: string;
  email: string;
  role: string;
  giveAccessAs?: 'user' | 'admin';
  profile?: IProfile;
  customers?: ICustomer[];
  items?: IItem[];
  invoices?: IInvoice[];
  expenses?: IExpense[];
  notifications?: INotification[];
  settings?: ISettings;
}
export interface UserModel extends Model<IUser> {
  // insert into user when data is created:
  insertProfileToUserData(
    userId: string,
    profileData: IProfile,
  ): Promise<IProfile | null>;
  insertCustomerToUserData(
    userId: string,
    customerData: ICustomer,
  ): Promise<ICustomer | null>;
  insertItemToUserData(userId: string, itemData: IItem): Promise<IItem | null>;
  insertExpenseToUserData(
    userId: string,
    expenseData: IExpense,
  ): Promise<IExpense | null>;
  insertInvoiceToUserData(
    userId: string,
    invoiceData: IInvoice,
  ): Promise<IInvoice | null>;

  // update user data when data is updated:
  updateUserProfileWhenProfileIsUpdated(
    userId: string | undefined,
    profileBody: object,
  ): Promise<IProfile | null>;
  updateUserCustomerWhenCustomerIsUpdated(
    userId: string | undefined,
    customerId: string | undefined,
    customerBody: object,
  ): Promise<ICustomer | null>;
  updateUserItemWhenItemIsUpdated(
    userId: string | undefined,
    itemId: string | undefined,
    itemBody: object,
  ): Promise<IItem | null>;
  updateUserExpenseWhenExpenseIsUpdated(
    userId: string | undefined,
    expenseId: string | undefined,
    expenseBody: object,
  ): Promise<IExpense | null>;
  updateUserInvoiceWhenInvoiceIsUpdated(
    userId: string | undefined,
    expenseId: string | undefined,
    expenseBody: object,
  ): Promise<IInvoice | null>;

  // delete data from user when any data is deleted:
  deleteUserProfileWhenProfileIsDeleted(
    userId: string | undefined,
  ): Promise<IProfile | null>;
  deleteUserCustomerWhenCustomerIsDeleted(
    userId: string | undefined,
    customerId: string | undefined,
  ): Promise<ICustomer | null>;
  deleteUserItemWhenItemIsDeleted(
    userId: string | undefined,
    itemId: string | undefined,
  ): Promise<IItem | null>;
  deleteUserExpenseWhenExpenseIsDeleted(
    userId: string | undefined,
    expenseId: string | undefined,
  ): Promise<IExpense | null>;
  deleteUserInvoiceWhenInvoiceIsDeleted(
    userId: string | undefined,
    invoiceId: string | undefined,
  ): Promise<IInvoice | null>;
}
export default IUser;
