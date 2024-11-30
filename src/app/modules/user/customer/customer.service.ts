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
// getSingle customer:
const getSingleCustomerFromDB = async (id: string) => {
  const result = await Customer.findById(id);
  return result;
};
// update customer:
const updateCustomer = async (id: string, payload: ICustomer) => {
  const result = await Customer.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
// delete customer:
const deleteCustomer = async (id: string) => {
  const result = await Customer.findByIdAndDelete(id);
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
};
