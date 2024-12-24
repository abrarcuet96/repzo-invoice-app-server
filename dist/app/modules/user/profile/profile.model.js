"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const mongoose_1 = require("mongoose");
const address_model_1 = __importDefault(require("../address/address.model"));
const ProfileSchema = new mongoose_1.Schema({
    userId: { type: String, required: false }, // Optional
    profileId: { type: String, required: false }, // Optional
    companyName: { type: String, required: true },
    industryName: { type: String, required: true },
    currency: { type: String, required: true },
    timeZone: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    address: { type: address_model_1.default, required: true }, // Referencing AddressSchema
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
exports.Profile = (0, mongoose_1.model)('Profile', ProfileSchema);
exports.default = ProfileSchema;
