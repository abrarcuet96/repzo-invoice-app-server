export default interface IPayment {
  userId?: string;
  paymentId?: string;
  amount: number;
  status: string;
}
