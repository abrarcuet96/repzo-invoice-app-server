import express from 'express';
import { SettingsControllers } from './settings.controller';
const settingsRouter = express.Router();

settingsRouter.post('/', SettingsControllers.createSettings);
settingsRouter.get('/:settingsId', SettingsControllers.getSingleSettings);
settingsRouter.get('/', SettingsControllers.getSettingss);
settingsRouter.put('/:settingsId', SettingsControllers.updateSettings);
settingsRouter.delete('/:settingsId', SettingsControllers.deleteSettings);

export const SettingsRoutes = settingsRouter;
