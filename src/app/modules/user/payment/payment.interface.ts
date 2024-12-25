export default interface IPayment {
  userId?: string;
  paymentId?: string;
  paymentNo?: string;
  amount: number;
  status: string;
}
