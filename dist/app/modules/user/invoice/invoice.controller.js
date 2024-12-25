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
exports.InvoiceControllers = void 0;
const uuid_1 = require("uuid");
const generateId_1 = require("../../../utils/generateId");
const user_model_1 = require("../user-modules/user.model");
const invoice_model_1 = require("./invoice.model");
const invoice_service_1 = require("./invoice.service");
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoiceData = req.body;
        const { userId } = req.params;
        invoiceData.userId = userId;
        const invoiceId = (0, uuid_1.v4)();
        invoiceData.invoiceId = invoiceId;
        const paymentId = (0, uuid_1.v4)();
        const invoiceNo = yield (0, generateId_1.generateNewId)(invoice_model_1.Invoice, userId, 'invoiceNo', 'INV');
        invoiceData.invoiceNo = invoiceNo;
        invoiceData.payment.paymentId = paymentId;
        invoiceData.payment.userId = userId;
        const result = yield invoice_service_1.InvoiceServices.createInvoiceIntoDB(invoiceData);
        yield user_model_1.User.insertInvoiceToUserData(userId, invoiceData);
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.insertUserInvoiceToAdminUserData(
        //   adminId,
        //   userId,
        //   invoiceData,
        // );
        res.status(200).json({
            success: true,
            message: 'Invoice is created successfully',
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
const getInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield invoice_service_1.InvoiceServices.getInvoiceFromDB();
        res.status(200).json({
            success: true,
            message: 'Invoices are retrieved successfully',
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
const getSingleInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceId } = req.params;
        const result = yield invoice_service_1.InvoiceServices.getSingleInvoiceFromDB(invoiceId);
        res.status(200).json({
            success: true,
            message: 'Invoice is retrieved successfully',
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
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceId } = req.params;
        const body = req.body;
        const result = yield invoice_service_1.InvoiceServices.updateInvoice(invoiceId, body);
        const invoiceData = yield invoice_model_1.Invoice.findOne({ invoiceId });
        const userId = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.userId;
        yield user_model_1.User.updateUserInvoiceWhenInvoiceIsUpdated(userId, invoiceId, body);
        // admin update:
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.updateAdminUserInvoiceWhenInvoiceIsUpdated(
        //   adminId,
        //   invoiceID,
        //   userId,
        //   body,
        // );
        res.status(200).json({
            success: true,
            message: 'Invoice is updated successfully',
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
const deleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceId } = req.params;
        const invoiceData = yield invoice_model_1.Invoice.findOne({ invoiceId });
        const userId = invoiceData === null || invoiceData === void 0 ? void 0 : invoiceData.userId;
        const result = yield invoice_service_1.InvoiceServices.deleteInvoice(invoiceId);
        yield user_model_1.User.deleteUserInvoiceWhenInvoiceIsDeleted(userId, invoiceId);
        // admin delete:
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.deleteAdminUserInvoiceWhenInvoiceIsDeleted(
        //   userId,
        //   adminId,
        //   invoiceId,
        // );
        res.status(200).json({
            success: true,
            message: 'Invoice is deleted successfully',
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
exports.InvoiceControllers = {
    createInvoice,
    getInvoices,
    getSingleInvoice,
    updateInvoice,
    deleteInvoice,
};
