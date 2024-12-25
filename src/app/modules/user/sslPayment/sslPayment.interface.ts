export interface IPaymentInfo {
  currency: string;
  userId: string;
  invoiceId: string;
  tranNo?: string;
  cus_name: string;
  tranId: string;
  status: string;
  amount: number;
}
