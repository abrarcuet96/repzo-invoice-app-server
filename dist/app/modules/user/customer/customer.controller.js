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
exports.CustomerControllers = void 0;
const uuid_1 = require("uuid");
const user_model_1 = require("../user-modules/user.model");
const customer_model_1 = require("./customer.model");
const customer_service_1 = require("./customer.service");
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerData = req.body;
        const { userId } = req.params;
        customerData.userId = userId;
        const customerId = (0, uuid_1.v4)();
        customerData.customerId = customerId;
        const result = yield customer_service_1.CustomerServices.createCustomerIntoDB(customerData);
        yield user_model_1.User.insertCustomerToUserData(userId, customerData);
        res.status(200).json({
            success: true,
            message: 'Customer is created successfully',
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
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield customer_service_1.CustomerServices.getCustomerFromDB();
        res.status(200).json({
            success: true,
            message: 'Customers are retrieved successfully',
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
const getCustomersQueryEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const result = yield customer_service_1.CustomerServices.getCustomerFromDBQyeryName(name);
        res.status(200).json({
            success: true,
            message: 'Customers are retrieved successfully',
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
const getSingleCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const result = yield customer_service_1.CustomerServices.getSingleCustomerFromDB(customerId);
        res.status(200).json({
            success: true,
            message: 'Customer is retrieved successfully',
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
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        // console.log(customerId);
        const body = req.body;
        const result = yield customer_service_1.CustomerServices.updateCustomer(customerId, body);
        const customerData = yield customer_model_1.Customer.findOne({ customerId });
        const userId = customerData === null || customerData === void 0 ? void 0 : customerData.userId;
        yield user_model_1.User.updateUserCustomerWhenCustomerIsUpdated(userId, customerId, body);
        // admin update:
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.updateAdminUserCustomerWhenCustomerIsUpdated(
        //   adminId,
        //   userId,
        //   customerID,
        //   body,
        // );
        res.status(200).json({
            success: true,
            message: 'Customer is updated successfully',
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
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.params;
        const customerData = yield customer_model_1.Customer.findOne({ customerId });
        const userId = customerData === null || customerData === void 0 ? void 0 : customerData.userId;
        const result = yield customer_service_1.CustomerServices.deleteCustomer(customerId);
        yield user_model_1.User.deleteUserCustomerWhenCustomerIsDeleted(userId, customerId);
        // admin delete:
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.deleteAdminUserCustomerWhenCustomerIsDeleted(
        //   userId,
        //   adminId,
        //   customerId,
        // );
        res.status(200).json({
            success: true,
            message: 'Customer is deleted successfully',
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
exports.CustomerControllers = {
    createCustomer,
    getCustomers,
    getSingleCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomersQueryEmail,
};
