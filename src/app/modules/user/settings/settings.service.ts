// Settings services:

import ISettings from './settings.interface';
import { Settings } from './settings.model';

// create settings:
const createSettingsIntoDB = async (settings: ISettings) => {
  const result = await Settings.create(settings);
  return result;
};
// get settings:
const getSettingsFromDB = async () => {
  const result = await Settings.find();
  return result;
};
// getSingle settings:
const getSingleSettingsFromDB = async (id: string) => {
  const result = await Settings.findById({ id });
  return result;
};
// update settings:
const updateSettings = async (id: string, payload: ISettings) => {
  const result = await Settings.findByIdAndUpdate(id, payload);
  return result;
};
// delete settings:
const deleteSettings = async (id: string) => {
  const result = await Settings.findByIdAndDelete(id);
  return result;
};
//
export const SettingsServices = {
  // settings:
  createSettingsIntoDB,
  getSettingsFromDB,
  getSingleSettingsFromDB,
  updateSettings,
  deleteSettings,
};
