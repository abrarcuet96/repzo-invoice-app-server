// Customer services:

import ICustomer from './customer.interface';
import { Customer } from './customer.model';

// create customer:
const createCustomerIntoDB = async (payload: ICustomer) => {
  const result = await Customer.create(payload);
  return result;
};
// get customer:
const getCustomerFromDB = async () => {
  const result = await Customer.find();
  return result;
};
const getCustomerFromDBQyeryName = async (name: string) => {
  const result = await Customer.find({
    name: { $regex: new RegExp(name, 'i') },
  });
  return result;
};
// getSingle customer:
const getSingleCustomerFromDB = async (customerId: string) => {
  const result = await Customer.findOne({ customerId });
  return result;
};
// update customer:
const updateCustomer = async (customerId: string, payload: ICustomer) => {
  const result = await Customer.findOneAndUpdate({ customerId }, payload, {
    new: true,
  });
  return result;
};
// delete customer:
const deleteCustomer = async (customerId: string) => {
  const result = await Customer.findOneAndDelete({ customerId });
  return result;
};
//
export const CustomerServices = {
  // customer:
  createCustomerIntoDB,
  getCustomerFromDB,
  getSingleCustomerFromDB,
  updateCustomer,
  deleteCustomer,
  getCustomerFromDBQyeryName,
};
