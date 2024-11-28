import IAddress from '../address/address.interface';

interface IProfile {
  userId?: string;
  phone: string;
  company: string;
  address: IAddress;
}
export default IProfile;
