"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItemValidationSchema = void 0;
const zod_1 = require("zod");
exports.InvoiceItemValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(1, 'Quantity must be at least 1'),
    name: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0, 'Price cannot be negative'),
});
exports.default = exports.InvoiceItemValidationSchema;
