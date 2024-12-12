import express from 'express';
import { QuoteControllers } from './quotes.controller';
const quoteRouter = express.Router();

quoteRouter.post('/:userId', QuoteControllers.createQuote);
quoteRouter.get('/:quoteId', QuoteControllers.getSingleQuote);
quoteRouter.get('/', QuoteControllers.getQuotes);
quoteRouter.put('/:quoteId', QuoteControllers.updateQuote);
quoteRouter.delete('/:quoteId', QuoteControllers.deleteQuote);

export const QuoteRoutes = quoteRouter;
