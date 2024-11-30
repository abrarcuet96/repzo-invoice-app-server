import express from 'express';
import { InvoiceControllers } from './invoice.controller';
const invoiceRouter = express.Router();

invoiceRouter.post('/:userId', InvoiceControllers.createInvoice);
invoiceRouter.get('/:invoiceId', InvoiceControllers.getSingleInvoice);
invoiceRouter.get('/', InvoiceControllers.getInvoices);
invoiceRouter.put('/:invoiceId', InvoiceControllers.updateInvoice);
invoiceRouter.delete('/:invoiceId', InvoiceControllers.deleteInvoice);

export const InvoiceRoutes = invoiceRouter;
