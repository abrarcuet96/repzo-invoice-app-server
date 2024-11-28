import IAddress from '../address/address.interface';

interface ICustomer {
  // id: string;
  userId?: string;
  customerId?: string;
  name: string;
  email: string;
  phone: string;
  address?: IAddress;
}
export default ICustomer;
