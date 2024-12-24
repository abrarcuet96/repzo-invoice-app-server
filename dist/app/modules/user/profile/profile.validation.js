"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const address_validation_1 = __importDefault(require("../address/address.validation"));
const ProfileValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(), // Optional field
    profileId: zod_1.z.string().optional(), // Optional field
    companyName: zod_1.z.string().min(1, 'Company name is required'),
    industryName: zod_1.z.string().min(1, 'Industry name is required'),
    currency: zod_1.z.string().min(1, 'Currency is required'),
    timeZone: zod_1.z.string().min(1, 'Time zone is required'),
    phone: zod_1.z.string().min(1, 'Phone is required'),
    company: zod_1.z.string().min(1, 'Company is required'),
    address: address_validation_1.default, // Embedding the AddressSchema
});
exports.default = ProfileValidationSchema;
