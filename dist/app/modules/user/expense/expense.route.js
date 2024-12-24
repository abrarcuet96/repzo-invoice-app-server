"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const expense_controller_1 = require("./expense.controller");
const expenseRouter = express_1.default.Router();
expenseRouter.post('/:userId', expense_controller_1.ExpenseControllers.createExpense);
expenseRouter.get('/:expenseId', expense_controller_1.ExpenseControllers.getSingleExpense);
expenseRouter.put('/:expenseId', expense_controller_1.ExpenseControllers.updateExpense);
expenseRouter.delete('/:expenseId', expense_controller_1.ExpenseControllers.deleteExpense);
expenseRouter.get('/', expense_controller_1.ExpenseControllers.getExpenses);
exports.ExpenseRoutes = expenseRouter;
