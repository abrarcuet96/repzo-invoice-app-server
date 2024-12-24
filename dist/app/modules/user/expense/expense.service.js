"use strict";
// Expense services:
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
exports.ExpenseServices = void 0;
const expense_model_1 = require("./expense.model");
// create expanse:
const createExpenseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield expense_model_1.Expense.create(payload);
    return result;
});
// get expanse:
const getExpenseFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield expense_model_1.Expense.find();
    return result;
});
// getSingle expanse:
const getSingleExpenseFromDB = (expenseId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield expense_model_1.Expense.findOne({ expenseId });
    return result;
});
// update expanse:
const updateExpense = (expenseId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield expense_model_1.Expense.findOneAndUpdate({ expenseId }, payload, {
        new: true,
    });
    return result;
});
// delete expanse:
const deleteExpense = (expenseId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield expense_model_1.Expense.findOneAndDelete({ expenseId });
    return result;
});
//
exports.ExpenseServices = {
    // expense:
    createExpenseIntoDB,
    getExpenseFromDB,
    getSingleExpenseFromDB,
    updateExpense,
    deleteExpense,
};
