"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsControllers = void 0;
const settings_service_1 = require("./settings.service");
const createSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { settings: settingsData } = req.body;
        const result = yield settings_service_1.SettingsServices.createSettingsIntoDB(settingsData);
        res.status(200).json({
            success: true,
            message: 'Settings is created successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getSettingss = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield settings_service_1.SettingsServices.getSettingsFromDB();
        res.status(200).json({
            success: true,
            message: 'Settingss are retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getSingleSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { settingsId } = req.params;
        const result = yield settings_service_1.SettingsServices.getSingleSettingsFromDB(settingsId);
        res.status(200).json({
            success: true,
            message: 'Settings is retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const updateSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { settingsId } = req.params;
        const body = req.body;
        const result = yield settings_service_1.SettingsServices.updateSettings(settingsId, body);
        res.status(200).json({
            success: true,
            message: 'Settings is updated successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const deleteSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { settingsId } = req.params;
        const result = yield settings_service_1.SettingsServices.deleteSettings(settingsId);
        res.status(200).json({
            success: true,
            message: 'Settings is deleted successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
exports.SettingsControllers = {
    createSettings,
    getSettingss,
    getSingleSettings,
    updateSettings,
    deleteSettings,
};
