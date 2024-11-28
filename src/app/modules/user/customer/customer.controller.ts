import { Request, Response } from 'express';
import { CustomerServices } from './customer.service';

const createCustomer = async (req: Request, res: Response) => {
  try {
    const { customer: customerData } = req.body;

    const result = await CustomerServices.createCustomerIntoDB(customerData);
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
    console.log(result);
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
    console.log(result);
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
    const body = req.body;
    const result = await CustomerServices.updateCustomer(customerId, body);
    console.log(result);
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
    const result = await CustomerServices.deleteCustomer(customerId);
    console.log(result);
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
};
