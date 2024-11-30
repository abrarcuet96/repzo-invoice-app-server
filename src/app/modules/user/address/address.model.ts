import { model, Schema } from 'mongoose';
import IAddress from './address.interface';

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: {
    type: String,
    required: true,
  },
  country: { type: String, required: true },
});
export const Address = model<IAddress>('Address', AddressSchema);
export default AddressSchema;
