"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
    userId: { type: String, required: false },
    itemId: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
        enum: ['USD', 'EUR', 'BDT', 'GBP'],
    },
    type: {
        type: String,
        required: true,
        enum: ['service', 'product'],
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
exports.Item = (0, mongoose_1.model)('Item', ItemSchema);
exports.default = ItemSchema;
