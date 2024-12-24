"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const paymentRouter = express_1.default.Router();
paymentRouter.post('/', payment_controller_1.PaymentControllers.createPayment);
paymentRouter.get('/:paymentId', payment_controller_1.PaymentControllers.getSinglePayment);
paymentRouter.get('/', payment_controller_1.PaymentControllers.getPayments);
paymentRouter.put('/:paymentId', payment_controller_1.PaymentControllers.updatePayment);
paymentRouter.delete('/:paymentId', payment_controller_1.PaymentControllers.deletePayment);
exports.PaymentRoutes = paymentRouter;
