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
exports.InvoiceItemControllers = void 0;
const invoiceItem_service_1 = require("./invoiceItem.service");
const createInvoiceItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceItem: invoiceItemData } = req.body;
        const result = yield invoiceItem_service_1.InvoiceItemServices.createInvoiceItemIntoDB(invoiceItemData);
        res.status(200).json({
            success: true,
            message: 'InvoiceItem is created successfully',
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
const getInvoiceItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield invoiceItem_service_1.InvoiceItemServices.getInvoiceItemFromDB();
        res.status(200).json({
            success: true,
            message: 'InvoiceItems are retrieved successfully',
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
const getSingleInvoiceItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceItemId } = req.params;
        const result = yield invoiceItem_service_1.InvoiceItemServices.getSingleInvoiceItemFromDB(invoiceItemId);
        res.status(200).json({
            success: true,
            message: 'InvoiceItem is retrieved successfully',
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
const updateInvoiceItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceItemId } = req.params;
        const body = req.body;
        const result = yield invoiceItem_service_1.InvoiceItemServices.updateInvoiceItem(invoiceItemId, body);
        res.status(200).json({
            success: true,
            message: 'InvoiceItem is updated successfully',
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
const deleteInvoiceItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { invoiceItemId } = req.params;
        const result = yield invoiceItem_service_1.InvoiceItemServices.deleteInvoiceItem(invoiceItemId);
        res.status(200).json({
            success: true,
            message: 'InvoiceItem is deleted successfully',
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
exports.InvoiceItemControllers = {
    createInvoiceItem,
    getInvoiceItems,
    getSingleInvoiceItem,
    updateInvoiceItem,
    deleteInvoiceItem,
};
