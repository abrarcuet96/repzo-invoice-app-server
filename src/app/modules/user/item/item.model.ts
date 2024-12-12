import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';
import IItem from './item.interface';
const ItemSchema = new Schema<IItem>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
        ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');

        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
        ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');

        return ret;
      },
    },
  },
);
export const Item = model<IItem>('Item', ItemSchema);
export default ItemSchema;
