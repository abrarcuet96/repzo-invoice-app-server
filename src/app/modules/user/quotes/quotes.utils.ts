// import { Quote } from './quotes.model';

// const findLastQuoteId = async (userId: string) => {
//   const lastQuote = await Quote.findOne(
//     {
//       userId: userId,
//     },
//     {
//       quoteId: 1,
//       _id: 0,
//     },
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();
//   return lastQuote?.quoteId ? lastQuote.quoteId : undefined;
// };
// // year semesterCode 4 digit number
// export const generatedQuoteId = async (userId: string) => {
//   // first time 0000

//   let currentId = (0).toString();
//   const lastQuoteId = await findLastQuoteId(userId);

//   if (lastQuoteId) {
//     currentId = lastQuoteId.substring(3);
//   }
//   let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

//   incrementId = `QUO${incrementId}`;

//   return incrementId;
// };
