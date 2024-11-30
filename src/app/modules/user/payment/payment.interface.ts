export default interface IPayment {
  userId?: string;
  method: string;
  amount: number;
  date: string;
}
