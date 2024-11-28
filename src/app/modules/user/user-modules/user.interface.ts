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
  profile?: IProfile;
  customers?: ICustomer[];
  items?: IItem[];
  invoices?: IInvoice[];
  expenses?: IExpense[];
  notifications?: INotification[];
  settings?: ISettings;
}
export interface UserModel extends Model<IProfile> {
  // insert into user when data is created:
  insertProfileToUserData(
    userId: string,
    profileData: IProfile,
  ): Promise<IProfile | null>;
  insertCustomerToUserData(
    userId: string,
    customerData: ICustomer,
  ): Promise<ICustomer | null>;

  // update user data when data is updated
  updateUserProfileWhenProfileIsUpdated(
    userId: string | undefined,
    profileBody: object,
  ): Promise<IProfile | null>;
  updateUserCustomerWhenCustomerIsUpdated(
    userId: string | undefined,
    customerId: string | undefined,
    customerBody: object,
  ): Promise<IProfile | null>;
}
export default IUser;
