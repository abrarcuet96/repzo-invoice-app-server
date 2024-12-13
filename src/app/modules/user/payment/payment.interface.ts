export default interface IPayment {
  userId?: string;
  paymentId?: string;
  // method: string;
  amount: number;
  date: string;
  status: string;
}
