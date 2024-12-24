"use strict";
// InvoiceItem services:
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
exports.InvoiceItemServices = void 0;
const invoiceItem_model_1 = require("./invoiceItem.model");
// create invoiceItem:
const createInvoiceItemIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield invoiceItem_model_1.InvoiceItem.create(payload);
    return result;
});
// get invoiceItem:
const getInvoiceItemFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield invoiceItem_model_1.InvoiceItem.find();
    return result;
});
// getSingle invoiceItem:
const getSingleInvoiceItemFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield invoiceItem_model_1.InvoiceItem.findById({ id });
    return result;
});
// update invoiceItem:
const updateInvoiceItem = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield invoiceItem_model_1.InvoiceItem.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// delete invoiceItem:
const deleteInvoiceItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield invoiceItem_model_1.InvoiceItem.findByIdAndDelete(id);
    return result;
});
//
exports.InvoiceItemServices = {
    // invoice item:
    createInvoiceItemIntoDB,
    getInvoiceItemFromDB,
    getSingleInvoiceItemFromDB,
    updateInvoiceItem,
    deleteInvoiceItem,
};
