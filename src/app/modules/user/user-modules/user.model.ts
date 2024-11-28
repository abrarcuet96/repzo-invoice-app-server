import { model, Schema } from 'mongoose';
import flattenObject from '../../../config/objectFlattening';
import ICustomer from '../customer/customer.interface';
import CustomerSchema from '../customer/customer.model';
import ExpenseSchema from '../expense/expense.model';
import InvoiceSchema from '../invoice/invoice.model';
import ItemSchema from '../item/item.model';
import NotificationSchema from '../notification/notification.model';
import ProfileSchema from '../profile/profile.model';
import SettingsSchema from '../settings/settings.model';
import IUser, { UserModel } from './user.interface';

const UserSchema = new Schema<IUser, UserModel>({
  name: { type: String, required: [true, 'Name is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+@.+\..+/, 'Invalid email address'],
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['user', 'admin', 'manager'],
  },
  profile: { type: ProfileSchema, required: false },
  customers: { type: [CustomerSchema], required: false },
  items: { type: [ItemSchema], required: false },
  invoices: { type: [InvoiceSchema], required: false },
  expenses: { type: [ExpenseSchema], required: false },
  notifications: { type: [NotificationSchema], required: false },
  settings: { type: SettingsSchema, required: false },
});
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

export const User = model<IUser, UserModel>('User', UserSchema);
