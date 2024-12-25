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
exports.ExpenseControllers = void 0;
const uuid_1 = require("uuid");
const generateId_1 = require("../../../utils/generateId");
const user_model_1 = require("../user-modules/user.model");
const expense_model_1 = require("./expense.model");
const expense_service_1 = require("./expense.service");
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenseData = req.body;
        const { userId } = req.params;
        expenseData.userId = userId;
        const expenseId = (0, uuid_1.v4)();
        expenseData.expenseId = expenseId;
        const expenseNo = yield (0, generateId_1.generateNewId)(expense_model_1.Expense, userId, 'expenseNo', 'EXP');
        expenseData.expenseNo = expenseNo;
        const result = yield expense_service_1.ExpenseServices.createExpenseIntoDB(expenseData);
        yield user_model_1.User.insertExpenseToUserData(userId, expenseData);
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.insertUserExpenseToAdminUserData(
        //   adminId,
        //   userId,
        //   expenseData,
        // );
        res.status(200).json({
            success: true,
            message: 'Expense is created successfully',
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
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield expense_service_1.ExpenseServices.getExpenseFromDB();
        res.status(200).json({
            success: true,
            message: 'Expenses are retrieved successfully',
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
const getSingleExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { expenseId } = req.params;
        const result = yield expense_service_1.ExpenseServices.getSingleExpenseFromDB(expenseId);
        res.status(200).json({
            success: true,
            message: 'Expense is retrieved successfully',
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
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { expenseId } = req.params;
        const body = req.body;
        const result = yield expense_service_1.ExpenseServices.updateExpense(expenseId, body);
        const expenseData = yield expense_model_1.Expense.findOne({ expenseId });
        const userId = expenseData === null || expenseData === void 0 ? void 0 : expenseData.userId;
        yield user_model_1.User.updateUserExpenseWhenExpenseIsUpdated(userId, expenseId, body);
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.updateAdminUserExpenseWhenExpenseIsUpdated(
        //   adminId,
        //   userId,
        //   expenseID,
        //   body,
        // );
        res.status(200).json({
            success: true,
            message: 'Expense is updated successfully',
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
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { expenseId } = req.params;
        const expenseData = yield expense_model_1.Expense.findOne({ expenseId });
        const userId = expenseData === null || expenseData === void 0 ? void 0 : expenseData.userId;
        const result = yield expense_service_1.ExpenseServices.deleteExpense(expenseId);
        yield user_model_1.User.deleteUserExpenseWhenExpenseIsDeleted(userId, expenseId);
        // admin delete:
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.deleteAdminUserExpenseWhenExpenseIsDeleted(
        //   userId,
        //   adminId,
        //   expenseId,
        // );
        res.status(200).json({
            success: true,
            message: 'Expense is deleted successfully',
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
exports.ExpenseControllers = {
    createExpense,
    getExpenses,
    getSingleExpense,
    updateExpense,
    deleteExpense,
};
