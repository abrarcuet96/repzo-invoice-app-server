// Payment services:

import IPayment from './payment.interface';
import { Payment } from './payment.model';

// create payment:
const createPaymentIntoDB = async (payload: IPayment) => {
  const result = await Payment.create(payload);
  return result;
};
// get payment:
const getPaymentFromDB = async () => {
  const result = await Payment.find();
  return result;
};
// getSingle payment:
const getSinglePaymentFromDB = async (id: string) => {
  const result = await Payment.findById({ id });
  return result;
};
// update payment:
const updatePayment = async (id: string, payload: IPayment) => {
  const result = await Payment.findByIdAndUpdate(id, payload);
  return result;
};
// delete payment:
const deletePayment = async (id: string) => {
  const result = await Payment.findByIdAndDelete(id);
  return result;
};
//
export const PaymentServices = {
  // payment:
  createPaymentIntoDB,
  getPaymentFromDB,
  getSinglePaymentFromDB,
  updatePayment,
  deletePayment,
};
