import bcrypt from 'bcrypt';
import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';
import config from '../../../config';
import flattenObject from '../../../config/objectFlattening';
import ICustomer from '../customer/customer.interface';
import CustomerSchema from '../customer/customer.model';
import IExpense from '../expense/expense.interface';
import ExpenseSchema from '../expense/expense.model';
import IInvoice from '../invoice/invoice.interface';
import InvoiceSchema from '../invoice/invoice.model';
import IItem from '../item/item.interface';
import ItemSchema from '../item/item.model';
import NotificationSchema from '../notification/notification.model';
import ProfileSchema from '../profile/profile.model';
import IQuote from '../quotes/quotes.interface';
import QuoteSchema from '../quotes/quotes.model';
import SettingsSchema from '../settings/settings.model';
import IUser, { UserModel } from './user.interface';
const UserSchema = new Schema<IUser, UserModel>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: { type: String, required: false },
    profileImage: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['user', 'customer'],
    },
    profile: { type: ProfileSchema, required: false },
    customers: { type: [CustomerSchema], required: false },
    items: { type: [ItemSchema], required: false },
    invoices: { type: [InvoiceSchema], required: false },
    quotes: { type: [QuoteSchema], required: false },
    expenses: { type: [ExpenseSchema], required: false },
    notifications: { type: [NotificationSchema], required: false },
    settings: { type: SettingsSchema, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
        ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');

        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
        ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');

        return ret;
      },
    },
  },
);

UserSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');

  const user = this as IUser; // doc
  // hashing password and save into DB
  if (user.password) {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
// insert into user when data is created:
UserSchema.statics.insertProfileToUserData = async function (
  userId,
  profileData,
) {
  await this.findByIdAndUpdate(
    { _id: userId },
    {
      $set: { profile: profileData },
    },
  );
};
UserSchema.statics.insertCustomerToUserData = async function (
  userId: string,
  customerData: ICustomer,
) {
  await this.findByIdAndUpdate(
    { _id: userId },
    {
      $push: { customers: customerData },
    },
  );
};
UserSchema.statics.insertItemToUserData = async function (
  userId: string,
  itemData: IItem,
) {
  await this.findByIdAndUpdate(
    { _id: userId },
    {
      $push: { items: itemData },
    },
  );
};
UserSchema.statics.insertExpenseToUserData = async function (
  userId: string,
  expenseData: IExpense,
) {
  await this.findByIdAndUpdate(
    { _id: userId },
    {
      $push: { expenses: expenseData },
    },
  );
};
UserSchema.statics.insertInvoiceToUserData = async function (
  userId: string,
  invoiceData: IInvoice,
) {
  await this.findByIdAndUpdate(
    { _id: userId },
    {
      $push: { invoices: invoiceData },
    },
  );
};
UserSchema.statics.insertQuoteToUserData = async function (
  userId: string,
  quoteData: IQuote,
) {
  await this.findOneAndUpdate(
    { _id: userId },
    {
      $push: { quotes: quoteData },
    },
  );
};

// update user data when data is updated:
UserSchema.statics.updateUserProfileWhenProfileIsUpdated = async function (
  userId,
  body,
) {
  const userUpdateData = flattenObject(body, 'profile');
  await this.findOneAndUpdate({ _id: userId }, { $set: userUpdateData });
};
UserSchema.statics.updateUserCustomerWhenCustomerIsUpdated = async function (
  userId: string,
  customerId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any>,
) {
  // Define updateFields as an object with string keys
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFields: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(body)) {
    updateFields[`customers.$[customerField].${key}`] = value;
  }

  await User.updateOne(
    { _id: userId },
    { $set: updateFields },
    {
      arrayFilters: [
        { 'customerField.customerId': customerId }, // Match the specific customer by ID
      ],
    },
  );
};
UserSchema.statics.updateUserItemWhenItemIsUpdated = async function (
  userId: string,
  itemId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any>,
) {
  // Define updateFields as an object with string keys
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFields: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(body)) {
    updateFields[`items.$[itemField].${key}`] = value;
  }

  await User.updateOne(
    { _id: userId },
    { $set: updateFields },
    {
      arrayFilters: [
        { 'itemField.itemId': itemId }, // Match the specific item by ID
      ],
    },
  );
};
UserSchema.statics.updateUserExpenseWhenExpenseIsUpdated = async function (
  userId: string,
  expenseId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any>,
) {
  // Define updateFields as an object with string keys
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFields: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(body)) {
    updateFields[`expenses.$[expenseField].${key}`] = value;
  }

  await User.updateOne(
    { _id: userId },
    { $set: updateFields },
    {
      arrayFilters: [
        { 'expenseField.expenseId': expenseId }, // Match the specific item by ID
      ],
    },
  );
};
UserSchema.statics.updateUserInvoiceWhenInvoiceIsUpdated = async function (
  userId: string,
  invoiceId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any>,
) {
  // Define updateFields as an object with string keys
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFields: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(body)) {
    updateFields[`invoices.$[invoiceField].${key}`] = value;
  }

  await User.updateOne(
    { _id: userId },
    { $set: updateFields },
    {
      arrayFilters: [
        { 'invoiceField.invoiceId': invoiceId }, // Match the specific item by ID
      ],
    },
  );
};
UserSchema.statics.updateUserQuoteWhenQuoteIsUpdated = async function (
  userId: string,
  quoteId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any>,
) {
  // Define updateFields as an object with string keys
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFields: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(body)) {
    updateFields[`quotes.$[quoteField].${key}`] = value;
  }

  await User.updateOne(
    { _id: userId },
    { $set: updateFields },
    {
      arrayFilters: [
        { 'quoteField.quoteId': quoteId }, // Match the specific item by ID
      ],
    },
  );
};

// delete data from user when any data is deleted:
UserSchema.statics.deleteUserCustomerWhenCustomerIsDeleted = async function (
  userId: string,
  customerId: string,
) {
  await User.updateOne(
    { _id: userId },
    {
      $pull: {
        customers: { customerId: customerId },
      },
    },
  );
};
UserSchema.statics.deleteUserItemWhenItemIsDeleted = async function (
  userId: string,
  itemId: string,
) {
  await User.updateOne(
    { _id: userId },
    {
      $pull: {
        items: { itemId: itemId },
      },
    },
  );
};
UserSchema.statics.deleteUserExpenseWhenExpenseIsDeleted = async function (
  userId: string,
  expenseId: string,
) {
  await User.updateOne(
    { _id: userId },
    {
      $pull: {
        expenses: { expenseId: expenseId },
      },
    },
  );
};
UserSchema.statics.deleteUserInvoiceWhenInvoiceIsDeleted = async function (
  userId: string,
  invoiceId: string,
) {
  await User.updateOne(
    { _id: userId },
    {
      $pull: {
        invoices: { invoiceId: invoiceId },
      },
    },
  );
};
UserSchema.statics.deleteUserQuoteWhenQuoteIsDeleted = async function (
  userId: string,
  quoteId: string,
) {
  await User.updateOne(
    { _id: userId },
    {
      $pull: {
        quotes: { quoteId: quoteId },
      },
    },
  );
};
UserSchema.statics.deleteUserProfileWhenProfileIsDeleted = async function (
  userId: string,
) {
  await User.updateOne(
    { _id: userId },
    {
      $unset: { profile: 1 },
      $set: {
        customers: [],
        items: [],
        quotes: [],
        invoices: [],
        expenses: [],
        notifications: [],
      },
    },
  );
};
export const User = model<IUser, UserModel>('User', UserSchema);
