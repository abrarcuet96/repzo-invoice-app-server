"use strict";
// Settings services:
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
exports.SettingsServices = void 0;
const settings_model_1 = require("./settings.model");
// create settings:
const createSettingsIntoDB = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.create(settings);
    return result;
});
// get settings:
const getSettingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.find();
    return result;
});
// getSingle settings:
const getSingleSettingsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.findById({ id });
    return result;
});
// update settings:
const updateSettings = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.findByIdAndUpdate(id, payload);
    return result;
});
// delete settings:
const deleteSettings = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield settings_model_1.Settings.findByIdAndDelete(id);
    return result;
});
//
exports.SettingsServices = {
    // settings:
    createSettingsIntoDB,
    getSettingsFromDB,
    getSingleSettingsFromDB,
    updateSettings,
    deleteSettings,
};
