"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const invoice_controller_1 = require("./invoice.controller");
const invoiceRouter = express_1.default.Router();
invoiceRouter.post('/:userId', invoice_controller_1.InvoiceControllers.createInvoice);
invoiceRouter.get('/:invoiceId', invoice_controller_1.InvoiceControllers.getSingleInvoice);
invoiceRouter.get('/', invoice_controller_1.InvoiceControllers.getInvoices);
invoiceRouter.put('/:invoiceId', invoice_controller_1.InvoiceControllers.updateInvoice);
invoiceRouter.delete('/:invoiceId', invoice_controller_1.InvoiceControllers.deleteInvoice);
exports.InvoiceRoutes = invoiceRouter;
