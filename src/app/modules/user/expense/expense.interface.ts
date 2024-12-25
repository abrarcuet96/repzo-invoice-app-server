interface IExpense {
  userId?: string;
  expenseId?: string;
  expenseNo?: string;
  name: string;
  amount: number;
  currency: string;
  date: string;
  category: string;
}
export default IExpense;
