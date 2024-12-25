"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const mongoose_1 = require("mongoose");
const invoiceItem_model_1 = __importDefault(require("../invoiceItem/invoiceItem.model"));
const payment_model_1 = __importDefault(require("../payment/payment.model"));
const InvoiceSchema = new mongoose_1.Schema({
    userId: { type: String, required: false },
    customerId: { type: String, required: false },
    customerNo: { type: String, required: false },
    invoiceId: { type: String, required: false },
    invoiceNo: { type: String, required: false },
    issuedDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    items: { type: [invoiceItem_model_1.default], required: false },
    status: {
        type: String,
        required: true,
        enum: ['paid', 'unpaid'],
    },
    total: {
        type: Number,
        required: false,
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'BDT', 'GBP'],
    },
    payment: { type: payment_model_1.default, required: false },
    isDeleted: {
        type: Boolean,
        required: false,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            const createdAt = (0, moment_timezone_1.default)(ret.createdAt).tz('Asia/Dhaka');
            const updatedAt = (0, moment_timezone_1.default)(ret.updatedAt).tz('Asia/Dhaka');
            ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
            ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');
            return ret;
        },
    },
    toObject: {
        transform: (doc, ret) => {
            const createdAt = (0, moment_timezone_1.default)(ret.createdAt).tz('Asia/Dhaka');
            const updatedAt = (0, moment_timezone_1.default)(ret.updatedAt).tz('Asia/Dhaka');
            ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
            ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');
            return ret;
        },
    },
});
exports.Invoice = (0, mongoose_1.model)('Invoice', InvoiceSchema);
exports.default = InvoiceSchema;
