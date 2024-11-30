import { Request, Response } from 'express';
import { SettingsServices } from './settings.service';

const createSettings = async (req: Request, res: Response) => {
  try {
    const { settings: settingsData } = req.body;

    const result = await SettingsServices.createSettingsIntoDB(settingsData);
    res.status(200).json({
      success: true,
      message: 'Settings is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSettingss = async (req: Request, res: Response) => {
  try {
    const result = await SettingsServices.getSettingsFromDB();
    res.status(200).json({
      success: true,
      message: 'Settingss are retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const getSingleSettings = async (req: Request, res: Response) => {
  try {
    const { settingsId } = req.params;
    const result = await SettingsServices.getSingleSettingsFromDB(settingsId);
    res.status(200).json({
      success: true,
      message: 'Settings is retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const updateSettings = async (req: Request, res: Response) => {
  try {
    const { settingsId } = req.params;
    const body = req.body;
    const result = await SettingsServices.updateSettings(settingsId, body);
    res.status(200).json({
      success: true,
      message: 'Settings is updated successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const deleteSettings = async (req: Request, res: Response) => {
  try {
    const { settingsId } = req.params;
    const result = await SettingsServices.deleteSettings(settingsId);
    res.status(200).json({
      success: true,
      message: 'Settings is deleted successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
export const SettingsControllers = {
  createSettings,
  getSettingss,
  getSingleSettings,
  updateSettings,
  deleteSettings,
};
