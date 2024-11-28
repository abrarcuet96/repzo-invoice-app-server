import IAddress from '../address/address.interface';

export default interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: IAddress;
}
