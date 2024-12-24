"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const settings_controller_1 = require("./settings.controller");
const settingsRouter = express_1.default.Router();
settingsRouter.post('/', settings_controller_1.SettingsControllers.createSettings);
settingsRouter.get('/:settingsId', settings_controller_1.SettingsControllers.getSingleSettings);
settingsRouter.get('/', settings_controller_1.SettingsControllers.getSettingss);
settingsRouter.put('/:settingsId', settings_controller_1.SettingsControllers.updateSettings);
settingsRouter.delete('/:settingsId', settings_controller_1.SettingsControllers.deleteSettings);
exports.SettingsRoutes = settingsRouter;
