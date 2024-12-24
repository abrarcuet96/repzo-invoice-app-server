"use strict";
// Profile services:
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
exports.ProfileServices = void 0;
const profile_model_1 = require("./profile.model");
// create profile:
const createProfileIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.Profile.create(payload);
    return result;
});
// get profile:
const getProfileFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.Profile.find();
    return result;
});
// getSingle profile:
const getSingleProfileFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.Profile.findById(id);
    return result;
});
// update profile:
const updateProfile = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.Profile.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// delete profile:
const deleteProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profile_model_1.Profile.findByIdAndDelete(id);
    return result;
});
//
exports.ProfileServices = {
    // profile:
    createProfileIntoDB,
    getProfileFromDB,
    getSingleProfileFromDB,
    updateProfile,
    deleteProfile,
};
