"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const mongoose_1 = require("mongoose");
const ExpenseSchema = new mongoose_1.Schema({
    userId: { type: String, required: false },
    expenseId: { type: String, required: false },
    name: { type: String, required: true },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'BDT', 'GBP'],
    },
    date: {
        type: String,
        required: true,
    },
    category: { type: String, required: true },
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
exports.Expense = (0, mongoose_1.model)('Expense', ExpenseSchema);
exports.default = ExpenseSchema;
