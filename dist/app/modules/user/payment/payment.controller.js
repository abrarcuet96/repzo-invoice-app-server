"use strict";
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
exports.PaymentControllers = void 0;
const uuid_1 = require("uuid");
const generateId_1 = require("../../../utils/generateId");
const payment_model_1 = require("./payment.model");
const payment_service_1 = require("./payment.service");
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentData = req.body;
        const { userId } = req.params;
        paymentData.userId = userId;
        const paymentId = (0, uuid_1.v4)();
        const paymentNo = yield (0, generateId_1.generateNewId)(payment_model_1.Payment, userId, 'paymentNo', 'PAY');
        paymentData.paymentNo = paymentNo;
        paymentData.paymentId = paymentId;
        const result = yield payment_service_1.PaymentServices.createPaymentIntoDB(paymentData);
        res.status(200).json({
            success: true,
            message: 'Payment is created successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield payment_service_1.PaymentServices.getPaymentFromDB();
        res.status(200).json({
            success: true,
            message: 'Payments are retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getSinglePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentId } = req.params;
        const result = yield payment_service_1.PaymentServices.getSinglePaymentFromDB(paymentId);
        res.status(200).json({
            success: true,
            message: 'Payment is retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentId } = req.params;
        const body = req.body;
        const result = yield payment_service_1.PaymentServices.updatePayment(paymentId, body);
        res.status(200).json({
            success: true,
            message: 'Payment is updated successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentId } = req.params;
        const result = yield payment_service_1.PaymentServices.deletePayment(paymentId);
        res.status(200).json({
            success: true,
            message: 'Payment is deleted successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
exports.PaymentControllers = {
    createPayment,
    getPayments,
    getSinglePayment,
    updatePayment,
    deletePayment,
};
