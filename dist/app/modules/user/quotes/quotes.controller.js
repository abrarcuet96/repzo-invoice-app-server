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
exports.QuoteControllers = void 0;
const uuid_1 = require("uuid");
const user_model_1 = require("../user-modules/user.model");
const quotes_model_1 = require("./quotes.model");
const quotes_service_1 = require("./quotes.service");
const createQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quoteData = req.body;
        const { userId } = req.params;
        quoteData.userId = userId;
        quoteData.quoteDate = new Date().toString();
        const quoteId = (0, uuid_1.v4)();
        quoteData.quoteId = quoteId;
        const result = yield quotes_service_1.QuoteServices.createQuoteIntoDB(quoteData);
        yield user_model_1.User.insertQuoteToUserData(userId, quoteData);
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.insertUserquoteToAdminUserData(
        //   adminId,
        //   userId,
        //   quoteData,
        // );
        res.status(200).json({
            success: true,
            message: 'Quote is created successfully',
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
const getQuotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield quotes_service_1.QuoteServices.getQuoteFromDB();
        res.status(200).json({
            success: true,
            message: 'Quotes are retrieved successfully',
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
const getSingleQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quoteId } = req.params;
        const result = yield quotes_service_1.QuoteServices.getSingleQuoteFromDB(quoteId);
        res.status(200).json({
            success: true,
            message: 'Quote is retrieved successfully',
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
const updateQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quoteId } = req.params;
        const body = req.body;
        const result = yield quotes_service_1.QuoteServices.updateQuote(quoteId, body);
        const quoteData = yield quotes_model_1.Quote.findOne({ quoteId });
        const userId = quoteData === null || quoteData === void 0 ? void 0 : quoteData.userId;
        // const quoteID = quoteData?._id?.toString();
        yield user_model_1.User.updateUserQuoteWhenQuoteIsUpdated(userId, quoteId, body);
        res.status(200).json({
            success: true,
            message: 'Quote is updated successfully',
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
const deleteQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quoteId } = req.params;
        // console.log(quoteId);
        const quoteData = yield quotes_model_1.Quote.findOne({ quoteId });
        const userId = quoteData === null || quoteData === void 0 ? void 0 : quoteData.userId;
        const result = yield quotes_service_1.QuoteServices.deleteQuote(quoteId);
        yield user_model_1.User.deleteUserQuoteWhenQuoteIsDeleted(userId, quoteId);
        res.status(200).json({
            success: true,
            message: 'Quote is deleted successfully',
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
exports.QuoteControllers = {
    createQuote,
    getQuotes,
    getSingleQuote,
    updateQuote,
    deleteQuote,
};
