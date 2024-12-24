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
exports.getTracks = void 0;
const customer_model_1 = require("../customer/customer.model");
const expense_model_1 = require("../expense/expense.model");
const invoice_model_1 = require("../invoice/invoice.model");
const item_model_1 = require("../item/item.model");
const quotes_model_1 = require("../quotes/quotes.model");
const getTracks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const totalCustomers = yield customer_model_1.Customer.countDocuments({ userId });
    const totalItems = yield item_model_1.Item.countDocuments({ userId });
    const invoices = yield invoice_model_1.Invoice.find({ userId });
    const quotes = yield quotes_model_1.Quote.find({ userId });
    const expenses = yield expense_model_1.Expense.find({ userId });
    console.log(expenses);
    const totalInvoices = invoices.length;
    const unpaidInvoices = invoices.filter((invoice) => invoice.status === 'unpaid');
    const paidInvoices = invoices.filter((invoice) => invoice.status === 'paid');
    const totalUnpaidInvoices = unpaidInvoices.length;
    const totalPaidInvoices = paidInvoices.length;
    const totalAmountUnpaidInvoices = unpaidInvoices.reduce((sum, inv) => { var _a; return sum + ((_a = inv.total) !== null && _a !== void 0 ? _a : 0); }, 0);
    const totalAmountPaidInvoices = paidInvoices.reduce((sum, inv) => { var _a; return sum + ((_a = inv.total) !== null && _a !== void 0 ? _a : 0); }, 0);
    const pendingPayments = invoices.filter((invoice) => { var _a; return ((_a = invoice.payment) === null || _a === void 0 ? void 0 : _a.status) === 'pending'; });
    const receivedPayments = invoices.filter((invoice) => { var _a; return ((_a = invoice.payment) === null || _a === void 0 ? void 0 : _a.status) === 'received'; });
    const totalPendingPayments = pendingPayments.length;
    const totalReceivedPayments = receivedPayments.length;
    const totalAmountPendingPayments = pendingPayments.reduce((sum, inv) => { var _a, _b; return sum + ((_b = (_a = inv.payment) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : 0); }, 0);
    const totalAmountReceivedPayments = receivedPayments.reduce((sum, inv) => { var _a, _b; return sum + ((_b = (_a = inv.payment) === null || _a === void 0 ? void 0 : _a.amount) !== null && _b !== void 0 ? _b : 0); }, 0);
    const totalQuotes = quotes.length;
    const acceptedQuotes = quotes.filter((quote) => quote.isAccepted);
    const declinedQuotes = quotes.filter((quote) => quote.isDeclined);
    const pendingQuotes = quotes.filter((quote) => !quote.isAccepted && !quote.isDeclined);
    const totalAcceptedQuotes = acceptedQuotes.length;
    const totalDeclinedQuotes = declinedQuotes.length;
    const totalPendingQuotes = pendingQuotes.length;
    const totalAmountQuotes = quotes.reduce((sum, quote) => { var _a; return sum + ((_a = quote.total) !== null && _a !== void 0 ? _a : 0); }, 0);
    const totalAmountAcceptedQuotes = acceptedQuotes.reduce((sum, quote) => { var _a; return sum + ((_a = quote.total) !== null && _a !== void 0 ? _a : 0); }, 0);
    const totalAmountDeclinedQuotes = declinedQuotes.reduce((sum, quote) => { var _a; return sum + ((_a = quote.total) !== null && _a !== void 0 ? _a : 0); }, 0);
    const totalAmountPendingQuotes = pendingQuotes.reduce((sum, quote) => { var _a; return sum + ((_a = quote.total) !== null && _a !== void 0 ? _a : 0); }, 0);
    const totalExpenses = expenses.length;
    const totalAmountExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    // Extract expense dates and amounts
    const expenseDetails = expenses.map((expense) => ({
        amount: expense.amount,
        date: expense.date,
    }));
    return {
        expenseDetails,
        totalCustomers,
        totalItems,
        totalInvoices,
        totalUnpaidInvoices,
        totalPaidInvoices,
        totalAmountUnpaidInvoices,
        totalAmountPaidInvoices,
        totalPendingPayments,
        totalReceivedPayments,
        totalAmountPendingPayments,
        totalAmountReceivedPayments,
        totalQuotes,
        totalAcceptedQuotes,
        totalDeclinedQuotes,
        totalPendingQuotes,
        totalAmountQuotes,
        totalAmountAcceptedQuotes,
        totalAmountDeclinedQuotes,
        totalAmountPendingQuotes,
        totalExpenses,
        totalAmountExpenses,
    };
});
exports.getTracks = getTracks;
