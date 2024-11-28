import { model, Schema } from 'mongoose';
import ISettings from './settings.interface';

const SettingsSchema = new Schema<ISettings>({
  currency: {
    type: String,
    required: [true, 'Currency is required'],
    enum: ['USD', 'EUR', 'BDT', 'GBP'],
  },
  taxRate: {
    type: Number,
    required: [true, 'Tax rate is required'],
    min: [0, 'Tax rate cannot be negative'],
    max: [100, 'Tax rate cannot exceed 100'],
  },
  language: { type: String, required: [true, 'Language is required'] },
});
export const Settings = model<ISettings>('Settings', SettingsSchema);
