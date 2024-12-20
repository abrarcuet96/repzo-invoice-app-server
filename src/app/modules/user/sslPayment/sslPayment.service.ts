import { IPaymentInfo } from './sslPayment.interface';
import PaymentInfo from './sslPayment.model';

const createSSLPaymentIntoDB = async (payload: IPaymentInfo) => {
  const result = await PaymentInfo.create(payload);
  return result;
};
const updateSSLPaymentIntoDB = async (
  tranId: string,
  payload: Partial<IPaymentInfo>,
) => {
  const result = await PaymentInfo.findOneAndUpdate({ tranId }, payload, {
    new: true,
  });
  return result;
};
export const SSLPaymentServices = {
  createSSLPaymentIntoDB,
  updateSSLPaymentIntoDB,
};
