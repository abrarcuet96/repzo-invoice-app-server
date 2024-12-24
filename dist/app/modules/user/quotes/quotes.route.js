"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRoutes = void 0;
const express_1 = __importDefault(require("express"));
const quotes_controller_1 = require("./quotes.controller");
const quoteRouter = express_1.default.Router();
quoteRouter.post('/:userId', quotes_controller_1.QuoteControllers.createQuote);
quoteRouter.get('/:quoteId', quotes_controller_1.QuoteControllers.getSingleQuote);
quoteRouter.put('/:quoteId', quotes_controller_1.QuoteControllers.updateQuote);
quoteRouter.delete('/:quoteId', quotes_controller_1.QuoteControllers.deleteQuote);
quoteRouter.get('/', quotes_controller_1.QuoteControllers.getQuotes);
exports.QuoteRoutes = quoteRouter;
