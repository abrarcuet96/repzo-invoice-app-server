import { model, Schema } from 'mongoose';
import IAddress from './address.interface';

const AddressSchema = new Schema<IAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  state: { type: String, required: [true, 'State is required'] },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required'],
    match: [/^\d{4,6}$/, 'Invalid postal code'],
  },
  country: { type: String, required: [true, 'Country is required'] },
});
export const Address = model<IAddress>('Address', AddressSchema);
export default AddressSchema;
