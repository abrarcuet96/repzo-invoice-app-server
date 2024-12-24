"use strict";
// Quote services:
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
exports.QuoteServices = void 0;
const quotes_model_1 = require("./quotes.model");
// create Quote:
const createQuoteIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield quotes_model_1.Quote.create(payload);
    return result;
});
// get Quote:
const getQuoteFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield quotes_model_1.Quote.find();
    return result;
});
// getSingle Quote:
const getSingleQuoteFromDB = (quoteId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield quotes_model_1.Quote.findOne({ quoteId });
    return result;
});
// update Quote:
const updateQuote = (quoteId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setPayload = {};
    for (const key in payload) {
        // Ensure TypeScript knows key is a valid key of IQuote
        if (key in payload && payload[key] !== undefined) {
            setPayload[key] = payload[key];
        }
    }
    const result = yield quotes_model_1.Quote.findOneAndUpdate({ quoteId }, { $set: setPayload }, { new: true });
    return result;
});
// delete Quote:
const deleteQuote = (quoteId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield quotes_model_1.Quote.findOneAndDelete({ quoteId });
    return result;
});
//
exports.QuoteServices = {
    // Quote:
    createQuoteIntoDB,
    getQuoteFromDB,
    getSingleQuoteFromDB,
    updateQuote,
    deleteQuote,
};
