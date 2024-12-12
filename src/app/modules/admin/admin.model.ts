// import { model, Schema } from 'mongoose';
// import { IAdmin, ModelAdminModel } from './admin.interface';
// import AdminAccessedUserSchema from './adminAccessedUser/adminAccessedUser.model';

// const AdminSchema = new Schema<IAdmin, ModelAdminModel>({
//   name: {
//     type: String,
//     required: true,
//     minlength: 2,
//     maxlength: 100,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
//     lowercase: true,
//   },
//   role: { type: String, enum: ['admin', 'user'], required: true },
  
//   accessedUser: { type: [AdminAccessedUserSchema], required: false },
// });
// // insert into user when data is created:
// AdminSchema.statics.insertUserToAdminData = async function (
//   adminId,
//   adminAccessedUserData,
// ) {
//   await this.findByIdAndUpdate(
//     { _id: adminId },
//     {
//       $push: { accessedUser: adminAccessedUserData },
//     },
//   );
// };
// AdminSchema.statics.insertUserProfileToAdminUserData = async function (
//   adminId,
//   userId,
//   adminUserProfileData,
// ) {
//   await this.updateOne(
//     { _id: adminId, 'accessedUser.userId': userId },
//     {
//       $set: {
//         'accessedUser.$.profile': {
//           phone: adminUserProfileData.phone,
//           company: adminUserProfileData.company,
//           address: {
//             city: adminUserProfileData.address.city,
//             state: adminUserProfileData.address.state,
//             country: adminUserProfileData.address.country,
//           },
//         },
//       },
//     },
//   );
// };
// AdminSchema.statics.insertUserCustomerToAdminUserData = async function (
//   adminId,
//   userId,
//   adminUserCustomerData,
// ) {
//   await this.updateOne(
//     {
//       _id: adminId,
//       'accessedUser.userId': userId,
//     },
//     {
//       $push: {
//         'accessedUser.$.customers': {
//           customerId: adminUserCustomerData.customerId,
//           name: adminUserCustomerData.name,
//           email: adminUserCustomerData.email,
//           phone: adminUserCustomerData.phone,
//           address: {
//             city: adminUserCustomerData.address.city,
//           },
//         },
//       },
//     },
//   );
// };
// AdminSchema.statics.insertUserExpenseToAdminUserData = async function (
//   adminId,
//   userId,
//   adminUserExpenseData,
// ) {
//   await this.updateOne(
//     {
//       _id: adminId,
//       'accessedUser.userId': userId,
//     },
//     {
//       $push: {
//         'accessedUser.$.expenses': {
//           expenseId: adminUserExpenseData.expenseId,
//           name: adminUserExpenseData.name,
//           amount: adminUserExpenseData.amount,
//           currency: adminUserExpenseData.currency,
//           date: adminUserExpenseData.date,
//           category: adminUserExpenseData.category,
//         },
//       },
//     },
//   );
// };
// AdminSchema.statics.insertUserInvoiceToAdminUserData = async function (
//   adminId,
//   userId,
//   adminUserInvoiceData,
// ) {
//   await this.updateOne(
//     {
//       _id: adminId,
//       'accessedUser.userId': userId,
//     },
//     {
//       $push: {
//         'accessedUser.$.invoices': {
//           invoiceId: adminUserInvoiceData.invoiceId,
//           customerId: adminUserInvoiceData.customerId,
//           total: adminUserInvoiceData.total,
//           currency: adminUserInvoiceData.currency,
//           status: adminUserInvoiceData.status,
//           dueDate: adminUserInvoiceData.dueDate,
//         },
//       },
//     },
//   );
// };

// // update user data when data is updated:
// AdminSchema.statics.updateAdminUserProfileWhenProfileIsUpdated =
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   async function (adminId: string, userId: string, body: Record<string, any>) {
//     // Define updateFields as an object with string keys
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const updateFields: { [key: string]: any } = {};

//     for (const [key, value] of Object.entries(body)) {
//       updateFields[`accessedUser.$[userField].profile.${key}`] = value;
//     }

//     // Update query
//     await AdminModel.updateOne(
//       { _id: adminId },
//       { $set: updateFields },
//       {
//         arrayFilters: [{ 'userField.userId': userId }],
//       },
//     );
//   };
// AdminSchema.statics.updateAdminUserCustomerWhenCustomerIsUpdated =
//   async function (
//     adminId: string,
//     userId: string,
//     customerId: string,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     body: Record<string, any>,
//   ) {
//     // Define updateFields as an object with string keys
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const updateFields: { [key: string]: any } = {};

//     for (const [key, value] of Object.entries(body)) {
//       updateFields[
//         `accessedUser.$[userField].customers.$[customerField].${key}`
//       ] = value;
//     }

//     // Update query
//     await AdminModel.updateOne(
//       { _id: adminId },
//       { $set: updateFields },
//       {
//         arrayFilters: [
//           { 'userField.userId': userId },
//           { 'customerField.customerId': customerId },
//         ],
//       },
//     );
//   };

// AdminSchema.statics.updateAdminUserExpenseWhenExpenseIsUpdated =
//   async function (
//     adminId: string,
//     userId: string,
//     expenseId: string,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     body: Record<string, any>,
//   ) {
//     // Define updateFields as an object with string keys
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const updateFields: { [key: string]: any } = {};

//     for (const [key, value] of Object.entries(body)) {
//       updateFields[
//         `accessedUser.$[userField].expenses.$[expenseField].${key}`
//       ] = value;
//     }

//     // Update query
//     await AdminModel.updateOne(
//       { _id: adminId },
//       { $set: updateFields },
//       {
//         arrayFilters: [
//           { 'userField.userId': userId },
//           { 'expenseField.expenseId': expenseId },
//         ],
//       },
//     );
//   };
// AdminSchema.statics.updateAdminUserInvoiceWhenInvoiceIsUpdated =
//   async function (
//     adminId: string,
//     invoiceId: string,
//     userId: string,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     body: Record<string, any>,
//   ) {
//     // Define updateFields as an object with string keys
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const updateFields: { [key: string]: any } = {};

//     for (const [key, value] of Object.entries(body)) {
//       updateFields[
//         `accessedUser.$[userField].invoices.$[invoiceField].${key}`
//       ] = value;
//     }

//     await AdminModel.updateOne(
//       { _id: adminId },
//       { $set: updateFields },
//       {
//         arrayFilters: [
//           { 'userField.userId': userId },
//           { 'invoiceField.invoiceId': invoiceId },
//         ],
//       },
//     );
//   };

// // delete data from user when any data is deleted:
// AdminSchema.statics.deleteAdminUserCustomerWhenCustomerIsDeleted =
//   async function (userId: string, adminId: string, customerId: string) {
//     await this.updateOne(
//       { _id: adminId },
//       {
//         $pull: {
//           'accessedUser.$[userField].customers': { customerId: customerId },
//         },
//       },
//       {
//         arrayFilters: [{ 'userField.userId': userId }],
//       },
//     );
//   };
// AdminSchema.statics.deleteAdminUserExpenseWhenExpenseIsDeleted =
//   async function (userId: string, adminId: string, expenseId: string) {
//     await this.updateOne(
//       { _id: adminId },
//       {
//         $pull: {
//           'accessedUser.$[userField].expenses': { expenseId: expenseId },
//         },
//       },
//       {
//         arrayFilters: [{ 'userField.userId': userId }],
//       },
//     );
//   };
// AdminSchema.statics.deleteAdminUserInvoiceWhenInvoiceIsDeleted =
//   async function (userId: string, adminId: string, invoiceId: string) {
//     await this.updateOne(
//       { _id: adminId },
//       {
//         $pull: {
//           'accessedUser.$[userField].invoices': { invoiceId: invoiceId },
//         },
//       },
//       {
//         arrayFilters: [{ 'userField.userId': userId }],
//       },
//     );
//   };
// AdminSchema.statics.deleteAdminUserProfileWhenProfileIsDeleted =
//   async function (adminId: string, userId: string) {
//     await this.updateOne(
//       { _id: adminId },
//       {
//         $unset: {
//           'accessedUser.$[userField].profile': 1,
//         },
//         $set: {
//           'accessedUser.$[userField].customers': [],
//           'accessedUser.$[userField].items': [],
//           'accessedUser.$[userField].invoices': [],
//           'accessedUser.$[userField].expenses': [],
//           'accessedUser.$[userField].notifications': [],
//         },
//       },
//       {
//         arrayFilters: [
//           { 'userField.userId': userId }, // Match the specific accessedUser by userId
//         ],
//       },
//     );
//   };

// export const AdminModel = model<IAdmin, ModelAdminModel>(
//   'AdminModel',
//   AdminSchema,
// );
