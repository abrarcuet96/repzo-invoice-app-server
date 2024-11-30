import { model, Schema } from 'mongoose';
import ISettings from './settings.interface';

const SettingsSchema = new Schema<ISettings>({
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
});
export const Settings = model<ISettings>('Settings', SettingsSchema);
export default SettingsSchema;
