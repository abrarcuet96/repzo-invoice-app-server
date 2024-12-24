"use strict";
// Customer services:
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
exports.CustomerServices = void 0;
const customer_model_1 = require("./customer.model");
// create customer:
const createCustomerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_model_1.Customer.create(payload);
    return result;
});
// get customer:
const getCustomerFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_model_1.Customer.find();
    return result;
});
const getCustomerFromDBQyeryName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_model_1.Customer.find({
        name: { $regex: new RegExp(name, 'i') },
    });
    return result;
});
// getSingle customer:
const getSingleCustomerFromDB = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_model_1.Customer.findOne({ customerId });
    return result;
});
// update customer:
const updateCustomer = (customerId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_model_1.Customer.findOneAndUpdate({ customerId }, payload, {
        new: true,
    });
    return result;
});
// delete customer:
const deleteCustomer = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_model_1.Customer.findOneAndDelete({ customerId });
    return result;
});
//
exports.CustomerServices = {
    // customer:
    createCustomerIntoDB,
    getCustomerFromDB,
    getSingleCustomerFromDB,
    updateCustomer,
    deleteCustomer,
    getCustomerFromDBQyeryName,
};
