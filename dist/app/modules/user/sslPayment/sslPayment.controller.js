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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSLPaymentController = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const generateId_1 = require("../../../utils/generateId");
const invoice_model_1 = require("../invoice/invoice.model");
const user_model_1 = require("../user-modules/user.model");
const sslPayment_model_1 = __importDefault(require("./sslPayment.model"));
const sslPayment_service_1 = require("./sslPayment.service");
const createSSLPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentData = req.body;
        console.log(paymentData);
        const userId = paymentData.userId;
        const tranNo = yield (0, generateId_1.generateNewId)(sslPayment_model_1.default, userId, 'tranNo', 'TRX');
        paymentData.tranNo = tranNo;
        const tranId = paymentData.tranId;
        const initiateData = {
            store_id: 'repzo6763b4496cc0d',
            store_passwd: 'repzo6763b4496cc0d@ssl',
            total_amount: paymentData.total,
            currency: paymentData.currency,
            tran_id: tranId,
            invoiceId: paymentData.invoiceId,
            success_url: 'https://repzo-backend.vercel.app/api/sslPayment/success-payment',
            fail_url: 'https://repzo-backend.vercel.app/api/sslPayment/fail',
            cancel_url: 'https://repzo-backend.vercel.app/api/sslPayment/cancel',
            cus_name: 'Customer Name',
            cus_email: 'cust@yahoo.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            shipping_method: 'NO',
            product_name: 'Laptop',
            product_category: 'Laptop',
            product_profile: 'general',
            multi_card_name: 'mastercard,visacard,amexcard',
            value_a: 'ref001_A',
            value_b: 'ref002_B',
            value_c: 'ref003_C',
            value_d: 'ref004_D',
        };
        const response = yield (0, axios_1.default)({
            method: 'POST',
            url: 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
            data: initiateData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        // console.log(response);
        const saveData = {
            currency: paymentData.currency,
            userId: userId,
            invoiceId: paymentData.invoiceId,
            cus_name: 'Abrar',
            tranId: tranId,
            status: 'pending',
            amount: paymentData.total,
        };
        console.log('saved data: ', saveData);
        const result = yield sslPayment_service_1.SSLPaymentServices.createSSLPaymentIntoDB(saveData);
        console.log(result);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Payment is successfully done.',
                paymentUrl: response.data.GatewayPageURL,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong!',
            error: err,
        });
    }
});
const successSSLPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const successData = req.body;
        console.log('success data: ', successData);
        if (successData.status !== 'VALID') {
            throw new Error('Unauthorized payment, Invalid Payment');
        }
        const updateInfo = {
            status: 'success',
        };
        const tranId = successData.tran_id;
        // update the database:
        const updateData = yield sslPayment_service_1.SSLPaymentServices.updateSSLPaymentIntoDB(tranId, updateInfo);
        const invoiceUpdateInfo = {
            status: 'paid',
            payment: {
                status: 'recieved',
            },
        };
        const invoiceData = yield sslPayment_model_1.default.findOne({ tranId }, { userId: 1, invoiceId: 1 });
        const invoiceId = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.invoiceId;
        const userId = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.userId;
        yield invoice_model_1.Invoice.findOneAndUpdate({ invoiceId }, invoiceUpdateInfo);
        yield user_model_1.User.updateUserInvoiceWhenInvoiceIsUpdated(userId, invoiceId, invoiceUpdateInfo);
        console.log('updated data: ', updateData);
        res.redirect('https://repzo-invoice-app.web.app/success');
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const cancelSSLPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.redirect('https://repzo-invoice-app.web.app/cancel');
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const failSSLPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.redirect('https://repzo-invoice-app.web.app/fail');
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
exports.SSLPaymentController = {
    createSSLPayment,
    successSSLPayment,
    cancelSSLPayment,
    failSSLPayment,
};
