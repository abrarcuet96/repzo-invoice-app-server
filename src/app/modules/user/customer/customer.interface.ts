import IAddress from '../address/address.interface';

interface ICustomer {
  userId?: string;
  customerId?: string;
  customerNo?: string;
  name: string;
  email: string;
  phone: string;
  address?: IAddress;
}
export default ICustomer;
