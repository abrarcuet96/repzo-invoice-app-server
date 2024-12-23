import { Customer } from '../customer/customer.model';
import { Invoice } from '../invoice/invoice.model';
import { Quote } from '../quotes/quotes.model';
import { User } from '../user-modules/user.model';

const getSingleCustomerUserFromDB = async (email: string) => {
  const result = await User.aggregate([
    { $unwind: '$customers' },
    { $match: { 'customers.email': email } },
    {
      $project: { name: 1, email: 1, profileImage: 1, template: 1, profile: 1 },
    },
  ]);
  const customer = await Customer.findOne(
    { email: email },
    { customerId: 1, userId: 1, _id: 0 },
  );

  const customerId = customer ? customer.customerId : null;
  const userId = customer ? customer.userId : null;

  const quotes = await Quote.find({ customerId: customerId, userId: userId });
  const invoices = await Invoice.find({
    customerId: customerId,
    userId: userId,
  });

  return [result, quotes, invoices];
};
export const CustomerUserServices = {
  // user customer:
  getSingleCustomerUserFromDB,
  // getQuotesByCustomerIdFromDB,
};
