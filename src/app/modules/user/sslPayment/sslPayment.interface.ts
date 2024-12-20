export interface IPaymentInfo {
  currency: string; // Currency code (e.g., "USD", "BDT")
  userId: string; // Unique identifier for the user
  cus_name: string; // Customer name
  tranId: string; // Transaction ID
  status: string; // Payment status
  amount: number;
}
