import { model, Schema } from 'mongoose';
import IItem from './item.interface';

const ItemSchema = new Schema<IItem>({
  // id: { type: String, required: [true, 'Item ID is required'] },
  userId: { type: String, required: false },
  itemId: { type: String, required: false },
  name: { type: String, required: [true, 'Item name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    enum: ['USD', 'EUR', 'BDT', 'GBP'],
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['service', 'product'],
  },
});
export const Item = model<IItem>('Item', ItemSchema);
export default ItemSchema;
