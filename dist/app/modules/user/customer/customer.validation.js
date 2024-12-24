"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerValidationSchema = void 0;
const zod_1 = require("zod");
const address_validation_1 = __importDefault(require("../address/address.validation"));
exports.CustomerValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    customerId: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, 'Customer name is required'),
    email: zod_1.z.string().email('Invalid email address'),
    phone: zod_1.z
        .string()
        .regex(/^\+\d{7,15}$/, 'Invalid phone number format')
        .min(1, 'Phone is required'),
    address: address_validation_1.default.optional(),
});
exports.default = exports.CustomerValidationSchema;
