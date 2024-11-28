import express from 'express';
import { InvoiceItemControllers } from './invoiceItem.controller';
const invoiceItemRouter = express.Router();

invoiceItemRouter.post('/', InvoiceItemControllers.createInvoiceItem);
invoiceItemRouter.get(
  '/:invoiceItemId',
  InvoiceItemControllers.getSingleInvoiceItem,
);
invoiceItemRouter.get('/', InvoiceItemControllers.getInvoiceItems);
invoiceItemRouter.put(
  '/:invoiceItemId',
  InvoiceItemControllers.updateInvoiceItem,
);
invoiceItemRouter.delete(
  '/:invoiceItemId',
  InvoiceItemControllers.deleteInvoiceItem,
);

export const InvoiceItemRoutes = invoiceItemRouter;
