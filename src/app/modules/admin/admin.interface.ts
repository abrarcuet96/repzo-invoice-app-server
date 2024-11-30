import { Model } from 'mongoose';
import IAdminAccessedUser from './adminAccessedUser/adminAccessedUser.interface';
import IAdminCustomer from './adminCustomer/adminCustomer.interface';
import IAdminExpense from './adminExpense/adminExpense.interface';
import IAdminInvoice from './adminInvoice/adminInvoice.interface';
import IAdminUserProfile from './adminUserProfile/adminUserProfile.interface';

export interface IAdmin {
  name: string;
  email: string;
  role: 'admin';
  giveAccessAs?: 'user' | 'admin';
  accessedUser?: IAdminAccessedUser[];
}

export interface ModelAdminModel extends Model<IAdmin> {
  // insert into admin user when data is created:
  insertUserToAdminData(
    adminId: string,
    adminAccessedUserData: IAdminAccessedUser,
  ): Promise<IAdminAccessedUser | null>;
  insertUserProfileToAdminUserData(
    adminId: string,
    userId: string,
    adminUserProfileData: IAdminUserProfile,
  ): Promise<IAdminUserProfile | null>;
  insertUserCustomerToAdminUserData(
    adminId: string,
    userId: string,
    adminUserCustomerData: IAdminCustomer,
  ): Promise<IAdminCustomer | null>;
  insertUserExpenseToAdminUserData(
    adminId: string,
    userId: string,
    adminUserExpenseData: IAdminExpense,
  ): Promise<IAdminExpense | null>;
  insertUserInvoiceToAdminUserData(
    adminId: string,
    userId: string,
    adminUserInvoiceData: IAdminInvoice,
  ): Promise<IAdminInvoice | null>;

  // update admin user data when data is updated:
  updateAdminUserProfileWhenProfileIsUpdated(
    adminId: string | undefined,
    userId: string | undefined,
    profileBody: object,
  ): Promise<IAdminUserProfile | null>;
  updateAdminUserCustomerWhenCustomerIsUpdated(
    adminId: string | undefined,
    userId: string | undefined,
    customerId: string | undefined,
    customerBody: object,
  ): Promise<IAdminCustomer | null>;
  updateAdminUserExpenseWhenExpenseIsUpdated(
    adminId: string | undefined,
    userId: string | undefined,
    expenseId: string | undefined,
    expenseBody: object,
  ): Promise<IAdminExpense | null>;
  updateAdminUserInvoiceWhenInvoiceIsUpdated(
    adminId: string | undefined,
    invoiceId: string | undefined,
    userId: string | undefined,
    expenseBody: object,
  ): Promise<IAdminInvoice | null>;

  // delete data from admin user when any data is deleted:
  deleteAdminUserProfileWhenProfileIsDeleted(
    adminId: string | undefined,
    userId: string | undefined,
  ): Promise<IAdminUserProfile | null>;
  deleteAdminUserCustomerWhenCustomerIsDeleted(
    userId: string | undefined,
    adminId: string | undefined,
    customerId: string | undefined,
  ): Promise<IAdminCustomer | null>;

  deleteAdminUserExpenseWhenExpenseIsDeleted(
    userId: string | undefined,
    adminId: string | undefined,
    expenseId: string | undefined,
  ): Promise<IAdminExpense | null>;
  deleteAdminUserInvoiceWhenInvoiceIsDeleted(
    userId: string | undefined,
    adminId: string | undefined,
    invoiceId: string | undefined,
  ): Promise<IAdminInvoice | null>;
}
