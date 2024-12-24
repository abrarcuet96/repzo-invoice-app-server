"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceValidationSchema = void 0;
const zod_1 = require("zod");
const invoiceItem_validation_1 = __importDefault(require("../invoiceItem/invoiceItem.validation"));
const payment_validation_1 = __importDefault(require("../payment/payment.validation"));
exports.InvoiceValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    customerId: zod_1.z.string().min(1, 'Customer ID is required'),
    invoiceId: zod_1.z.string().optional(),
    issuedDate: zod_1.z.string().refine((val) => !isNaN(new Date(val).getTime()), {
        message: 'Invalid issued date',
    }),
    dueDate: zod_1.z.string().refine((val) => !isNaN(new Date(val).getTime()), {
        message: 'Invalid due date',
    }),
    status: zod_1.z.enum(['paid', 'unpaid']),
    items: zod_1.z.array(invoiceItem_validation_1.default).optional(),
    total: zod_1.z.number().min(0, 'Total cannot be negative').optional(),
    currency: zod_1.z.enum(['USD', 'EUR', 'BDT', 'GBP']),
    payment: payment_validation_1.default.optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.default = exports.InvoiceValidationSchema;
