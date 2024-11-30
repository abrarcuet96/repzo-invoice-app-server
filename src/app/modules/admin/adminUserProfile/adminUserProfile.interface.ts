export default interface IAdminUserProfile {
  phone: string;
  company: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
}
