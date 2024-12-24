"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const invoiceItem_validation_1 = __importDefault(require("../invoiceItem/invoiceItem.validation"));
const QuoteValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    customerId: zod_1.z.string().optional(),
    quoteId: zod_1.z.string().optional(),
    quoteDate: zod_1.z.string().optional(),
    expiryDate: zod_1.z.string().optional(),
    items: zod_1.z.array(invoiceItem_validation_1.default).optional(),
    total: zod_1.z.number().optional(),
    status: zod_1.z.enum(['accepted', 'declined', 'pending']),
    isAccepted: zod_1.z.boolean().optional(),
    isDeclined: zod_1.z.boolean().optional(),
    isInvoiceSent: zod_1.z.boolean().optional(),
    isDeleted: zod_1.z.boolean().optional(),
    message: zod_1.z.string().optional(),
    currency: zod_1.z.enum(['USD', 'EUR', 'BDT', 'GBP']),
});
exports.default = QuoteValidationSchema;
