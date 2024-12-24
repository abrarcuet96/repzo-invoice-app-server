"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemValidationSchema = void 0;
const zod_1 = require("zod");
exports.ItemValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    itemId: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, 'Item name is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    price: zod_1.z.number().min(0, 'Price cannot be negative'),
    currency: zod_1.z.enum(['USD', 'EUR', 'BDT', 'GBP']),
    type: zod_1.z.enum(['service', 'product']),
});
exports.default = exports.ItemValidationSchema;
