"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentValidationSchema = void 0;
const zod_1 = require("zod");
exports.PaymentValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    paymentId: zod_1.z.string().optional(),
    // method: z.enum(['credit_card', 'paypal', 'bank_transfer', 'cash']),
    amount: zod_1.z.number().min(0, 'Amount cannot be negative'),
    status: zod_1.z.enum(['pending', 'recieve']),
});
exports.default = exports.PaymentValidationSchema;
