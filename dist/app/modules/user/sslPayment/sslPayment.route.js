"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSLPaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const sslPayment_controller_1 = require("./sslPayment.controller");
const sslPaymentRouter = express_1.default.Router();
sslPaymentRouter.post('/', sslPayment_controller_1.SSLPaymentController.createSSLPayment);
sslPaymentRouter.post('/success-payment', sslPayment_controller_1.SSLPaymentController.successSSLPayment);
sslPaymentRouter.post('/fail', sslPayment_controller_1.SSLPaymentController.failSSLPayment);
sslPaymentRouter.post('/cancel', sslPayment_controller_1.SSLPaymentController.cancelSSLPayment);
exports.SSLPaymentRoutes = sslPaymentRouter;
