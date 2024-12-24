"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseValidationSchema = void 0;
const zod_1 = require("zod");
exports.ExpenseValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    expenseId: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, 'Expense name is required'),
    amount: zod_1.z.number().min(0, 'Amount cannot be negative'),
    currency: zod_1.z.enum(['USD', 'EUR', 'BDT', 'GBP']),
    date: zod_1.z.string().refine((val) => !isNaN(new Date(val).getTime()), {
        message: 'Invalid expense date',
    }),
    category: zod_1.z.string().min(1, 'Category is required'),
});
exports.default = exports.ExpenseValidationSchema;
