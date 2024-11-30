import { model, Schema } from 'mongoose';
import IItem from './item.interface';

const ItemSchema = new Schema<IItem>({
  userId: { type: String, required: false },
  itemId: { type: String, required: false },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: ['USD', 'EUR', 'BDT', 'GBP'],
  },
  type: {
    type: String,
    required: true,
    enum: ['service', 'product'],
  },
});
export const Item = model<IItem>('Item', ItemSchema);
export default ItemSchema;
