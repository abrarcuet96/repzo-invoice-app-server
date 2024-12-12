// Quote services:

import IQuote from './quotes.interface';
import { Quote } from './quotes.model';

// create Quote:
const createQuoteIntoDB = async (payload: IQuote) => {
  const result = await Quote.create(payload);
  return result;
};
// get Quote:
const getQuoteFromDB = async () => {
  const result = await Quote.find();
  return result;
};
// getSingle Quote:
const getSingleQuoteFromDB = async (id: string) => {
  const result = await Quote.findById(id);
  return result;
};
// update Quote:
const updateQuote = async (id: string, payload: Partial<IQuote>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setPayload: Record<string, any> = {};

  for (const key in payload) {
    // Ensure TypeScript knows key is a valid key of IQuote
    if (key in payload && payload[key as keyof IQuote] !== undefined) {
      setPayload[key] = payload[key as keyof IQuote];
    }
  }
  const result = await Quote.findByIdAndUpdate(
    id,
    { $set: setPayload },
    { new: true },
  );

  return result;
};
// delete Quote:
const deleteQuote = async (id: string) => {
  const result = await Quote.findByIdAndDelete(id);
  return result;
};
//
export const QuoteServices = {
  // Quote:
  createQuoteIntoDB,
  getQuoteFromDB,
  getSingleQuoteFromDB,
  updateQuote,
  deleteQuote,
};
