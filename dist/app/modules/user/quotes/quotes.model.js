"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const mongoose_1 = require("mongoose");
const invoiceItem_model_1 = __importDefault(require("../invoiceItem/invoiceItem.model"));
const QuoteSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: false,
    },
    customerId: {
        type: String,
        required: false,
    },
    customerNo: {
        type: String,
        required: false,
    },
    quoteId: {
        type: String,
        required: false,
    },
    quoteNo: {
        type: String,
        required: false,
    },
    quoteDate: {
        type: String,
        required: false,
    },
    expiryDate: {
        type: String,
        required: false,
    },
    items: { type: [invoiceItem_model_1.default], required: false },
    total: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        enum: ['accepted', 'declined', 'pending'],
        required: false,
    },
    isAccepted: {
        type: Boolean,
        required: false,
    },
    isDeclined: {
        type: Boolean,
        required: false,
    },
    isInvoiceSent: {
        type: Boolean,
        required: false,
    },
    isDeleted: {
        type: Boolean,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'BDT', 'GBP'],
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
exports.Quote = (0, mongoose_1.model)('Quote', QuoteSchema);
exports.default = QuoteSchema;
