import { model, Schema } from 'mongoose';
import {
  IAdmin,
  IAdminAccessedUser,
  IAdminCustomer,
  IAdminExpense,
  IAdminInvoice,
  IAdminUserProfile,
  ModelAdminModel,
} from './admin.interface';

// Admin Schema

// User Profile Schema
const AdminUserProfileSchema = new Schema<IAdminUserProfile>({
  phone: {
    type: String,
    required: true,
    match: [/^\+?[0-9]{10,15}$/, 'Please provide a valid phone number'],
  },
  company: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  address: {
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
  },
});

// Customer Schema
const AdminCustomerSchema = new Schema({
  customerId: { type: String, required: true },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: {
    city: { type: String },
  },
});

// Invoice Schema
const AdminInvoiceSchema = new Schema<IAdminInvoice>({
  invoiceId: { type: String, required: false },
  customerId: { type: String, required: false },
  total: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative'],
  },
  currency: {
    type: String,
    required: true,
    enum: ['BDT', 'USD', 'EUR'],
    default: 'BDT',
  },
  status: {
    type: String,
    enum: ['paid', 'unpaid', 'overdue'],
    required: true,
    default: 'unpaid',
  },
  dueDate: {
    type: String,
    required: true,
  },
});

// Expense Schema
const AdminExpenseSchema = new Schema<IAdminExpense>({
  expenseId: { type: String, required: false },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Expense amount cannot be negative'],
  },
  currency: {
    type: String,
    required: true,
    enum: ['BDT', 'USD', 'EUR'],
    default: 'BDT',
  },
  date: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
});
const AdminAccessedUserSchema = new Schema<IAdminAccessedUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['user'], required: true },
  userId: { type: String, required: false },
  profile: { type: AdminUserProfileSchema, required: false },
  customers: { type: [AdminCustomerSchema], required: false },
  invoices: { type: [AdminInvoiceSchema], required: false },
  expenses: { type: [AdminExpenseSchema], required: false },
});
const AdminSchema = new Schema<IAdmin, ModelAdminModel>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    lowercase: true,
  },
  role: { type: String, enum: ['admin'], required: true },
  giveAccessAs: {
    type: String,
    enum: ['user', 'admin'],
    required: false,
  },
  accessedUser: [AdminAccessedUserSchema],
});
// insert into user when data is created:
AdminSchema.statics.insertUserToAdminData = async function (
  adminId,
  adminAccessedUserData,
) {
  await this.findByIdAndUpdate(
    { _id: adminId },
    {
      $push: { accessedUser: adminAccessedUserData },
    },
  );
};
AdminSchema.statics.insertUserProfileToAdminUserData = async function (
  adminId,
  userId,
  adminUserProfileData,
) {
  await this.updateOne(
    { _id: adminId, 'accessedUser.userId': userId },
    {
      $set: {
        'accessedUser.$.profile': {
          phone: adminUserProfileData.phone,
          company: adminUserProfileData.company,
          address: {
            city: adminUserProfileData.address.city,
            state: adminUserProfileData.address.state,
            country: adminUserProfileData.address.country,
          },
        },
      },
    },
  );
};
AdminSchema.statics.insertUserCustomerToAdminUserData = async function (
  adminId,
  userId,
  adminUserCustomerData,
) {
  await this.updateOne(
    {
      _id: adminId,
      'accessedUser.userId': userId,
    },
    {
      $push: {
        'accessedUser.$.customers': {
          customerId: adminUserCustomerData.customerId,
          name: adminUserCustomerData.name,
          email: adminUserCustomerData.email,
          phone: adminUserCustomerData.phone,
          address: {
            city: adminUserCustomerData.address.city,
          },
        },
      },
    },
  );
};
AdminSchema.statics.insertUserExpenseToAdminUserData = async function (
  adminId,
  userId,
  adminUserExpenseData,
) {
  await this.updateOne(
    {
      _id: adminId,
      'accessedUser.userId': userId,
    },
    {
      $push: {
        'accessedUser.$.expenses': {
          expenseId: adminUserExpenseData.expenseId,
          name: adminUserExpenseData.name,
          amount: adminUserExpenseData.amount,
          currency: adminUserExpenseData.currency,
          date: adminUserExpenseData.date,
          category: adminUserExpenseData.category,
        },
      },
    },
  );
};
AdminSchema.statics.insertUserInvoiceToAdminUserData = async function (
  adminId,
  userId,
  adminUserInvoiceData,
) {
  await this.updateOne(
    {
      _id: adminId,
      'accessedUser.userId': userId,
    },
    {
      $push: {
        'accessedUser.$.invoices': {
          invoiceId: adminUserInvoiceData.invoiceId,
          customerId: adminUserInvoiceData.customerId,
          total: adminUserInvoiceData.total,
          currency: adminUserInvoiceData.currency,
          status: adminUserInvoiceData.status,
          dueDate: adminUserInvoiceData.dueDate,
        },
      },
    },
  );
};

// update user data when data is updated:
AdminSchema.statics.updateAdminUserProfileWhenProfileIsUpdated =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function (adminId: string, userId: string, body: Record<string, any>) {
    // Define updateFields as an object with string keys
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateFields: { [key: string]: any } = {};

    // Prepare the fields to update
    for (const [key, value] of Object.entries(body)) {
      updateFields[`accessedUser.$[userField].profile.$[profileField].${key}`] =
        value;
    }

    // Update query
    await AdminModel.updateOne(
      { _id: adminId }, // Match the admin by adminId
      { $set: updateFields }, // Set the new values
      {
        arrayFilters: [
          { 'userField.userId': userId }, // Match the specific user by userId
        ],
      },
    );
  };
AdminSchema.statics.updateAdminUserCustomerWhenCustomerIsUpdated =
  async function (
    adminId: string,
    userId: string,
    customerId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: Record<string, any>,
  ) {
    // Define updateFields as an object with string keys
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateFields: { [key: string]: any } = {};

    // Prepare the fields to update
    for (const [key, value] of Object.entries(body)) {
      updateFields[
        `accessedUser.$[userField].customers.$[customerField].${key}`
      ] = value;
    }

    // Update query
    await AdminModel.updateOne(
      { _id: adminId }, // Match the admin by adminId
      { $set: updateFields }, // Set the new values
      {
        arrayFilters: [
          { 'userField.userId': userId }, // Match the specific user by userId
          { 'customerField.customerId': customerId }, // Match the specific customer by customerId
        ],
      },
    );
  };

AdminSchema.statics.updateAdminUserExpenseWhenExpenseIsUpdated =
  async function (
    adminId: string,
    userId: string,
    expenseId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: Record<string, any>,
  ) {
    // Define updateFields as an object with string keys
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateFields: { [key: string]: any } = {};

    // Prepare the fields to update
    for (const [key, value] of Object.entries(body)) {
      updateFields[
        `accessedUser.$[userField].expenses.$[expenseField].${key}`
      ] = value;
    }

    // Update query
    await AdminModel.updateOne(
      { _id: adminId }, // Match the admin by adminId
      { $set: updateFields }, // Set the new values
      {
        arrayFilters: [
          { 'userField.userId': userId }, // Match the specific user by userId
          { 'expenseField.expenseId': expenseId }, // Match the specific customer by customerId
        ],
      },
    );
  };
AdminSchema.statics.updateAdminUserInvoiceWhenInvoiceIsUpdated =
  async function (
    adminId: string,
    invoiceId: string,
    userId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: Record<string, any>,
  ) {
    // Define updateFields as an object with string keys
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateFields: { [key: string]: any } = {};

    // Prepare the fields to update
    for (const [key, value] of Object.entries(body)) {
      updateFields[
        `accessedUser.$[userField].invoices.$[invoiceField].${key}`
      ] = value;
    }

    // Update query
    await AdminModel.updateOne(
      { _id: adminId }, // Match the admin by adminId
      { $set: updateFields }, // Set the new values
      {
        arrayFilters: [
          { 'userField.userId': userId }, // Match the specific user by userId
          { 'invoiceField.invoiceId': invoiceId }, // Match the specific customer by customerId
        ],
      },
    );
  };

// delete data from user when any data is deleted:
AdminSchema.statics.deleteAdminUserCustomerWhenCustomerIsDeleted =
  async function (userId: string, adminId: string, customerId: string) {
    await this.updateOne(
      { _id: adminId },
      {
        $pull: {
          // Find the accessedUser by userId and pull the customer by customerId
          'accessedUser.$[userField].customers': { customerId: customerId },
        },
      },
      {
        arrayFilters: [
          { 'userField.userId': userId }, // Targeting the specific user
        ],
      },
    );
  };
AdminSchema.statics.deleteAdminUserExpenseWhenExpenseIsDeleted =
  async function (userId: string, adminId: string, expenseId: string) {
    await this.updateOne(
      { _id: adminId },
      {
        $pull: {
          // Find the accessedUser by userId and pull the expense by expenseId
          'accessedUser.$[userField].expenses': { expenseId: expenseId },
        },
      },
      {
        arrayFilters: [
          { 'userField.userId': userId }, // Targeting the specific user
        ],
      },
    );
  };
AdminSchema.statics.deleteAdminUserInvoiceWhenInvoiceIsDeleted =
  async function (userId: string, adminId: string, invoiceId: string) {
    await this.updateOne(
      { _id: adminId },
      {
        $pull: {
          // Find the accessedUser by userId and pull the invoice by invoiceId
          'accessedUser.$[userField].invoices': { invoiceId: invoiceId },
        },
      },
      {
        arrayFilters: [
          { 'userField.userId': userId }, // Targeting the specific user
        ],
      },
    );
  };
AdminSchema.statics.deleteAdminUserProfileWhenProfileIsDeleted =
  async function (adminId: string, userId: string) {
    await this.updateOne(
      { _id: adminId },
      {
        $unset: {
          // Unset the profile field in the specific accessedUser
          'accessedUser.$[userField].profile': 1,
        },
        $set: {
          // Clear other fields in the specific accessedUser
          'accessedUser.$[userField].customers': [],
          'accessedUser.$[userField].items': [],
          'accessedUser.$[userField].invoices': [],
          'accessedUser.$[userField].expenses': [],
          'accessedUser.$[userField].notifications': [],
        },
      },
      {
        arrayFilters: [
          { 'userField.userId': userId }, // Match the specific accessedUser by userId
        ],
      },
    );
  };
// Compile Models

export const AdminUserProfileModel = model<IAdminUserProfile>(
  'AdminUserProfileModel',
  AdminUserProfileSchema,
);
export const AdminCustomerModel = model<IAdminCustomer>(
  'AdminCustomerModel',
  AdminCustomerSchema,
);
export const AdminInvoiceModel = model<IAdminInvoice>(
  'AdminInvoiceModel',
  AdminInvoiceSchema,
);
export const AdminExpenseModel = model<IAdminExpense>(
  'AdminExpenseModel',
  AdminExpenseSchema,
);
export const AdminAccessedUserModel = model<IAdminAccessedUser>(
  'AdminAccessedUserModel',
  AdminAccessedUserSchema,
);
export const AdminModel = model<IAdmin, ModelAdminModel>(
  'AdminModel',
  AdminSchema,
);
