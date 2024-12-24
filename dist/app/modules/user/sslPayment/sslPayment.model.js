"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentInfoSchema = new mongoose_1.Schema({
    currency: { type: String, required: true },
    userId: { type: String, required: true },
    invoiceId: { type: String, required: true },
    cus_name: { type: String, required: true },
    tranId: { type: String, required: true, unique: true },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'success', 'failed'],
    },
    amount: { type: Number, required: true },
}, {
    timestamps: true,
});
const PaymentInfo = (0, mongoose_1.model)('PaymentInfo', paymentInfoSchema);
exports.default = PaymentInfo;
