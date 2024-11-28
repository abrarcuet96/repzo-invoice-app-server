import express from 'express';
import { PaymentControllers } from './payment.controller';
const paymentRouter = express.Router();

paymentRouter.post('/', PaymentControllers.createPayment);
paymentRouter.get('/:paymentId', PaymentControllers.getSinglePayment);
paymentRouter.get('/', PaymentControllers.getPayments);
paymentRouter.put('/:paymentId', PaymentControllers.updatePayment);
paymentRouter.delete('/:paymentId', PaymentControllers.deletePayment);

export const PaymentRoutes = paymentRouter;
