import { User } from '../user-modules/user.model';

const getSingleCustomerUserFromDB = async (email: string) => {
  const result = await User.aggregate([
    { $unwind: '$customers' }, // Decompose the array into individual documents
    { $match: { 'customers.email': email } }, // Match customerId
    { $project: { name: 1, email: 1, profileImage: 1 } }, // Project desired fields
  ]);
  return result;
};
export const CustomerUserServices = {
  // user customer:
  getSingleCustomerUserFromDB,
};
