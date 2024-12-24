"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const invoiceItem_controller_1 = require("./invoiceItem.controller");
const invoiceItemRouter = express_1.default.Router();
invoiceItemRouter.post('/', invoiceItem_controller_1.InvoiceItemControllers.createInvoiceItem);
invoiceItemRouter.get('/:invoiceItemId', invoiceItem_controller_1.InvoiceItemControllers.getSingleInvoiceItem);
invoiceItemRouter.get('/', invoiceItem_controller_1.InvoiceItemControllers.getInvoiceItems);
invoiceItemRouter.put('/:invoiceItemId', invoiceItem_controller_1.InvoiceItemControllers.updateInvoiceItem);
invoiceItemRouter.delete('/:invoiceItemId', invoiceItem_controller_1.InvoiceItemControllers.deleteInvoiceItem);
exports.InvoiceItemRoutes = invoiceItemRouter;
