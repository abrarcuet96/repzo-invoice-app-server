"use strict";
// import { Customer } from './customer.model';
// const findLastCustomerId = async (userId: string) => {
//   const lastCustomer = await Customer.findOne(
//     {
//       userId: userId,
//     },
//     {
//       customerId: 1,
//       _id: 0,
//     },
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();
//   return lastCustomer?.customerId ? lastCustomer.customerId : undefined;
// };
// // year semesterCode 4 digit number
// export const generatedCustomerId = async (userId: string) => {
//   // first time 0000
//   let currentId = (0).toString();
//   const lastCustomerId = await findLastCustomerId(userId);
//   if (lastCustomerId) {
//     currentId = lastCustomerId.substring(3);
//   }
//   let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
//   incrementId = `CUS${incrementId}`;
//   return incrementId;
// };
