"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidationSchema = void 0;
const zod_1 = require("zod");
exports.AddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, 'Street is required'),
    city: zod_1.z.string().min(1, 'City is required'),
    state: zod_1.z.string().min(1, 'State is required'),
    postalCode: zod_1.z
        .string()
        .regex(/^\d{4,6}$/, 'Invalid postal code')
        .min(1, 'Postal code is required'),
    country: zod_1.z.string().min(1, 'Country is required'),
});
exports.default = exports.AddressValidationSchema;
