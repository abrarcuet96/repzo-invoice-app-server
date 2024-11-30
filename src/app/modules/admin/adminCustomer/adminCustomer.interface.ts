export default interface IAdminCustomer {
  customerId?: string;
  name: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
}
