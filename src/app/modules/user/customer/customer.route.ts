import express from 'express';
import { CustomerControllers } from './customer.controller';
const customerRouter = express.Router();

customerRouter.post('/:userId', CustomerControllers.createCustomer);
customerRouter.get('/:customerId', CustomerControllers.getSingleCustomer);
customerRouter.put('/:customerId', CustomerControllers.updateCustomer);
customerRouter.delete('/:customerId', CustomerControllers.deleteCustomer);
customerRouter.get('/', CustomerControllers.getCustomers);

export const CustomerRoutes = customerRouter;
