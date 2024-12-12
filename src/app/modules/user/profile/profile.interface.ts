import IAddress from '../address/address.interface';

interface IProfile {
  userId?: string;
  profileId?: string;
  companyName: string;
  industryName: string;
  currency: string;
  timeZone: string;
  phone: string;
  company: string;
  address: IAddress;
}
export default IProfile;
