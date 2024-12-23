import { Customer } from '../customer/customer.model';
import { Expense } from '../expense/expense.model';
import { Invoice } from '../invoice/invoice.model';
import { Item } from '../item/item.model';
import { Quote } from '../quotes/quotes.model';

export const getTracks = async (userId: string) => {
  const totalCustomers = await Customer.countDocuments({ userId });
  const totalItems = await Item.countDocuments({ userId });
  const invoices = await Invoice.find({ userId });
  const quotes = await Quote.find({ userId });
  const expenses = await Expense.find({ userId });
  console.log(expenses);

  const totalInvoices = invoices.length;
  const unpaidInvoices = invoices.filter(
    (invoice) => invoice.status === 'unpaid',
  );
  const paidInvoices = invoices.filter((invoice) => invoice.status === 'paid');

  const totalUnpaidInvoices = unpaidInvoices.length;
  const totalPaidInvoices = paidInvoices.length;
  const totalAmountUnpaidInvoices = unpaidInvoices.reduce(
    (sum, inv) => sum + (inv.total ?? 0),
    0,
  );
  const totalAmountPaidInvoices = paidInvoices.reduce(
    (sum, inv) => sum + (inv.total ?? 0),
    0,
  );

  const pendingPayments = invoices.filter(
    (invoice) => invoice.payment?.status === 'pending',
  );
  const receivedPayments = invoices.filter(
    (invoice) => invoice.payment?.status === 'received',
  );

  const totalPendingPayments = pendingPayments.length;
  const totalReceivedPayments = receivedPayments.length;
  const totalAmountPendingPayments = pendingPayments.reduce(
    (sum, inv) => sum + (inv.payment?.amount ?? 0),
    0,
  );
  const totalAmountReceivedPayments = receivedPayments.reduce(
    (sum, inv) => sum + (inv.payment?.amount ?? 0),
    0,
  );

  const totalQuotes = quotes.length;
  const acceptedQuotes = quotes.filter((quote) => quote.isAccepted);
  const declinedQuotes = quotes.filter((quote) => quote.isDeclined);
  const pendingQuotes = quotes.filter(
    (quote) => !quote.isAccepted && !quote.isDeclined,
  );

  const totalAcceptedQuotes = acceptedQuotes.length;
  const totalDeclinedQuotes = declinedQuotes.length;
  const totalPendingQuotes = pendingQuotes.length;

  const totalAmountQuotes = quotes.reduce(
    (sum, quote) => sum + (quote.total ?? 0),
    0,
  );
  const totalAmountAcceptedQuotes = acceptedQuotes.reduce(
    (sum, quote) => sum + (quote.total ?? 0),
    0,
  );
  const totalAmountDeclinedQuotes = declinedQuotes.reduce(
    (sum, quote) => sum + (quote.total ?? 0),
    0,
  );
  const totalAmountPendingQuotes = pendingQuotes.reduce(
    (sum, quote) => sum + (quote.total ?? 0),
    0,
  );

  const totalExpenses = expenses.length;
  const totalAmountExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  // Extract expense dates and amounts
  const expenseDetails = expenses.map((expense) => ({
    amount: expense.amount,
    date: expense.date,
  }));
  return {
    expenseDetails,
    totalCustomers,
    totalItems,
    totalInvoices,
    totalUnpaidInvoices,
    totalPaidInvoices,
    totalAmountUnpaidInvoices,
    totalAmountPaidInvoices,
    totalPendingPayments,
    totalReceivedPayments,
    totalAmountPendingPayments,
    totalAmountReceivedPayments,
    totalQuotes,
    totalAcceptedQuotes,
    totalDeclinedQuotes,
    totalPendingQuotes,
    totalAmountQuotes,
    totalAmountAcceptedQuotes,
    totalAmountDeclinedQuotes,
    totalAmountPendingQuotes,
    totalExpenses,
    totalAmountExpenses,
  };
};
