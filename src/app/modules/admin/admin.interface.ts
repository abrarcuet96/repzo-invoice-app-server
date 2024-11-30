import { Model } from 'mongoose';

// Admin Interface
export interface IAdmin {
  name: string;
  email: string;
  role: 'admin';
  giveAccessAs?: 'user' | 'admin';
  accessedUser?: IAdminAccessedUser[];
}

// Accessed User Interface
export interface IAdminAccessedUser {
  // _id: string;
  name: string;
  email: string;
  role: 'user';
  userId?: string;
  profile?: IAdminUserProfile;
  customers?: IAdminCustomer[];
  invoices?: IAdminInvoice[];
  expenses?: IAdminExpense[];
}

// User Profile Interface
export interface IAdminUserProfile {
  phone: string;
  company: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
}

// Customer Interface
export interface IAdminCustomer {
  customerId?: string;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
}

// Invoice Interface
export interface IAdminInvoice {
  invoiceId?: string;
  customerId?: string;
  total: number;
  currency: string;
  status: 'paid' | 'unpaid' | 'overdue';
  dueDate: string; // ISO date string
}

// Expense Interface
export interface IAdminExpense {
  expenseId?: string;
  name: string;
  amount: number;
  currency: string;
  date: string; // ISO date string
  category: string;
}
export interface ModelAdminModel extends Model<IAdmin> {
  // insert into user when data is created:
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

  // update user data when data is updated:
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

  // delete data from user when any data is deleted:
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
