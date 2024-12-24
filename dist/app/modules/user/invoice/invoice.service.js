"use strict";
// Invoice services:
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
exports.InvoiceServices = void 0;
const invoice_model_1 = require("./invoice.model");
// create invoice:
const createInvoiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield invoice_model_1.Invoice.create(payload);
    return result;
});
// get invoice:
const getInvoiceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield invoice_model_1.Invoice.find();
    return result;
});
// getSingle invoice:
const getSingleInvoiceFromDB = (invoiceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield invoice_model_1.Invoice.findOne({ invoiceId });
    return result;
});
// update invoice:
const updateInvoice = (invoiceId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setPayload = {};
    for (const key in payload) {
        // Ensure TypeScript knows key is a valid key of IInvoice
        if (key in payload && payload[key] !== undefined) {
            setPayload[key] = payload[key];
        }
    }
    const result = yield invoice_model_1.Invoice.findOneAndUpdate({ invoiceId }, { $set: setPayload }, { new: true });
    return result;
});
// delete invoice:
const deleteInvoice = (invoiceId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield invoice_model_1.Invoice.findOneAndDelete({ invoiceId });
    return result;
});
//
exports.InvoiceServices = {
    // invoice:
    createInvoiceIntoDB,
    getInvoiceFromDB,
    getSingleInvoiceFromDB,
    updateInvoice,
    deleteInvoice,
};
