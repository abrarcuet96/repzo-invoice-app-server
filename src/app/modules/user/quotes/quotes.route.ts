import express from 'express';
import { QuoteControllers } from './quotes.controller';
const quoteRouter = express.Router();

quoteRouter.post('/:userId', QuoteControllers.createQuote);
quoteRouter.get('/:quoteId', QuoteControllers.getSingleQuote);
quoteRouter.put('/:quoteId', QuoteControllers.updateQuote);
quoteRouter.delete('/:quoteId', QuoteControllers.deleteQuote);
quoteRouter.get('/', QuoteControllers.getQuotes);

export const QuoteRoutes = quoteRouter;
