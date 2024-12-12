import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';
import ISettings from './settings.interface';
const SettingsSchema = new Schema<ISettings>(
  {
    currency: {
      type: String,
      required: true,
      enum: ['USD', 'EUR', 'BDT', 'GBP'],
    },
    taxRate: {
      type: Number,
      required: true,
    },
    language: { type: String, required: [true, 'Language is required'] },
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
export const Settings = model<ISettings>('Settings', SettingsSchema);
export default SettingsSchema;
