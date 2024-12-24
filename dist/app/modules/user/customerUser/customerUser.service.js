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
exports.CustomerUserServices = void 0;
const customer_model_1 = require("../customer/customer.model");
const invoice_model_1 = require("../invoice/invoice.model");
const quotes_model_1 = require("../quotes/quotes.model");
const user_model_1 = require("../user-modules/user.model");
const getSingleCustomerUserFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
        { $unwind: '$customers' },
        { $match: { 'customers.email': email } },
        {
            $project: { name: 1, email: 1, profileImage: 1, template: 1, profile: 1 },
        },
    ]);
    const customer = yield customer_model_1.Customer.findOne({ email: email }, { customerId: 1, userId: 1, _id: 0 });
    const customerId = customer ? customer.customerId : null;
    const userId = customer ? customer.userId : null;
    const quotes = yield quotes_model_1.Quote.find({ customerId: customerId, userId: userId });
    const invoices = yield invoice_model_1.Invoice.find({
        customerId: customerId,
        userId: userId,
    });
    return [result, quotes, invoices];
});
exports.CustomerUserServices = {
    // user customer:
    getSingleCustomerUserFromDB,
    // getQuotesByCustomerIdFromDB,
};
