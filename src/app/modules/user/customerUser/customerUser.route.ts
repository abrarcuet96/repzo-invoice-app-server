import express from 'express';
import { CustomerUserController } from './customerUser.controller';
const customerUserRouter = express.Router();

customerUserRouter.get('/:email', CustomerUserController.getSingleCustomerUser);


export const CustomerUserRoutes = customerUserRouter;
