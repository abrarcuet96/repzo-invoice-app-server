export default interface IAdminExpense {
  expenseId?: string;
  name: string;
  amount: number;
  currency: string;
  date: string; // ISO date string
  category: string;
}
