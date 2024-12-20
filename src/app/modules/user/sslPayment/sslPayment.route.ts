import express from 'express';
import { SSLPaymentController } from './sslPayment.controller';
const sslPaymentRouter = express.Router();

sslPaymentRouter.post('/', SSLPaymentController.createSSLPayment);
sslPaymentRouter.post(
  '/success-payment',
  SSLPaymentController.successSSLPayment,
);
sslPaymentRouter.post('/fail', SSLPaymentController.failSSLPayment);
sslPaymentRouter.post('/cancel', SSLPaymentController.cancelSSLPayment);

export const SSLPaymentRoutes = sslPaymentRouter;
