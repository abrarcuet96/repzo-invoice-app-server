import express from 'express';
import { CustomerControllers } from './customer.controller';
const customerRouter = express.Router();

customerRouter.post('/', CustomerControllers.createCustomer);
customerRouter.get('/:customerId', CustomerControllers.getSingleCustomer);
customerRouter.get('/', CustomerControllers.getCustomers);
customerRouter.put('/:customerId', CustomerControllers.updateCustomer);
customerRouter.delete('/:customerId', CustomerControllers.deleteCustomer);

export const CustomerRoutes = customerRouter;
