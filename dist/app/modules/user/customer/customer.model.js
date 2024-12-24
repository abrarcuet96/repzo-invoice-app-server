"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const mongoose_1 = require("mongoose");
const address_model_1 = __importDefault(require("../address/address.model"));
const CustomerSchema = new mongoose_1.Schema({
    userId: { type: String, required: false },
    customerId: { type: String, required: false },
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: { type: address_model_1.default, required: false },
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
exports.Customer = (0, mongoose_1.model)('Customer', CustomerSchema);
exports.default = CustomerSchema;
