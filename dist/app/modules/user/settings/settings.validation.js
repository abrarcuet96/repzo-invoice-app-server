"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValidationSchema = void 0;
const zod_1 = require("zod");
exports.SettingsValidationSchema = zod_1.z.object({
    currency: zod_1.z.enum(['USD', 'EUR', 'BDT', 'GBP']),
    taxRate: zod_1.z
        .number()
        .min(0, 'Tax rate cannot be negative')
        .max(100, 'Tax rate cannot exceed 100'),
    language: zod_1.z.string().min(1, 'Language is required'),
});
exports.default = exports.SettingsValidationSchema;
