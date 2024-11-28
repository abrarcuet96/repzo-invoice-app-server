export default interface IExpense {
  // id: string;
  userId?: string;
  name: string;
  amount: number;
  currency: string;
  date: string;
  category: string;
}
