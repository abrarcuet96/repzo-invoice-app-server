"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
const customer_validation_1 = __importDefault(require("../customer/customer.validation"));
const expense_validation_1 = __importDefault(require("../expense/expense.validation"));
const invoice_validation_1 = __importDefault(require("../invoice/invoice.validation"));
const item_validation_1 = __importDefault(require("../item/item.validation"));
const notification_validation_1 = __importDefault(require("../notification/notification.validation"));
const profile_validation_1 = __importDefault(require("../profile/profile.validation"));
const quotes_validation_1 = __importDefault(require("../quotes/quotes.validation"));
const settings_validation_1 = __importDefault(require("../settings/settings.validation"));
exports.UserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().optional(),
    profileImage: zod_1.z.string().min(1, 'Image is required'),
    role: zod_1.z.enum(['user', 'customer']),
    profile: profile_validation_1.default.optional(),
    customers: zod_1.z.array(customer_validation_1.default).optional(),
    items: zod_1.z.array(item_validation_1.default).optional(),
    invoices: zod_1.z.array(invoice_validation_1.default).optional(),
    quotes: zod_1.z.array(quotes_validation_1.default).optional(),
    expenses: zod_1.z.array(expense_validation_1.default).optional(),
    notifications: zod_1.z.array(notification_validation_1.default).optional(),
    settings: settings_validation_1.default.optional(),
    template: zod_1.z
        .enum(['standard', 'continental', 'compact'])
        .default('standard')
        .optional(),
});
exports.default = exports.UserValidationSchema;
