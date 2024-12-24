"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("./customer.controller");
const customerRouter = express_1.default.Router();
customerRouter.post('/:userId', customer_controller_1.CustomerControllers.createCustomer);
customerRouter.get('/:customerId', customer_controller_1.CustomerControllers.getSingleCustomer);
customerRouter.put('/:customerId', customer_controller_1.CustomerControllers.updateCustomer);
customerRouter.delete('/:customerId', customer_controller_1.CustomerControllers.deleteCustomer);
// customerRouter.get('/', CustomerControllers.getCustomers);
customerRouter.get('/', customer_controller_1.CustomerControllers.getCustomersQueryEmail);
exports.CustomerRoutes = customerRouter;
