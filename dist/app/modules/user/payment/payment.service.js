"use strict";
// Payment services:
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServices = void 0;
const payment_model_1 = require("./payment.model");
// create payment:
const createPaymentIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.create(payload);
    return result;
});
// get payment:
const getPaymentFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.find();
    return result;
});
// getSingle payment:
const getSinglePaymentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.findById({ id });
    return result;
});
// update payment:
const updatePayment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.findByIdAndUpdate(id, payload);
    return result;
});
// delete payment:
const deletePayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.findByIdAndDelete(id);
    return result;
});
//
exports.PaymentServices = {
    // payment:
    createPaymentIntoDB,
    getPaymentFromDB,
    getSinglePaymentFromDB,
    updatePayment,
    deletePayment,
};
