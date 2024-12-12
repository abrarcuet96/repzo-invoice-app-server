import { Request, Response } from 'express';
// import { AdminModel } from '../../admin/admin.model';
import { User } from '../user-modules/user.model';
import { Customer } from './customer.model';
import { CustomerServices } from './customer.service';
import { generatedCustomerId } from './customer.utils';

const createCustomer = async (req: Request, res: Response) => {
  try {
    const customerData = req.body;
    const { userId } = req.params;
    customerData.userId = userId;
    const customerId = await generatedCustomerId(userId);
    customerData.customerId = customerId;
    const result = await CustomerServices.createCustomerIntoDB(customerData);

    await User.insertCustomerToUserData(userId, customerData);

    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.insertUserCustomerToAdminUserData(
    //   adminId,
    //   userId,
    //   customerData,
    // );
    res.status(200).json({
      success: true,
      message: 'Customer is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getCustomers = async (req: Request, res: Response) => {
  try {
    const result = await CustomerServices.getCustomerFromDB();

    res.status(200).json({
      success: true,
      message: 'Customers are retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const getCustomersQueryEmail = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const result = await CustomerServices.getCustomerFromDBQyeryName(
      name as string,
    );

    res.status(200).json({
      success: true,
      message: 'Customers are retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const getSingleCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const result = await CustomerServices.getSingleCustomerFromDB(customerId);

    res.status(200).json({
      success: true,
      message: 'Customer is retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    // console.log(customerId);
    const body = req.body;
    const result = await CustomerServices.updateCustomer(customerId, body);

    const customerData = await Customer.findOne({ customerId });
    const userId = customerData?.userId;

    await User.updateUserCustomerWhenCustomerIsUpdated(
      userId,
      customerId,
      body,
    );
    // admin update:
    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.updateAdminUserCustomerWhenCustomerIsUpdated(
    //   adminId,
    //   userId,
    //   customerID,
    //   body,
    // );

    res.status(200).json({
      success: true,
      message: 'Customer is updated successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const customerData = await Customer.findOne({ customerId });
    const userId = customerData?.userId;
    const result = await CustomerServices.deleteCustomer(customerId);
    await User.deleteUserCustomerWhenCustomerIsDeleted(userId, customerId);
    // admin delete:
    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.deleteAdminUserCustomerWhenCustomerIsDeleted(
    //   userId,
    //   adminId,
    //   customerId,
    // );
    res.status(200).json({
      success: true,
      message: 'Customer is deleted successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
export const CustomerControllers = {
  createCustomer,
  getCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomersQueryEmail,
};
