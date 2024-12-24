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
exports.ProfileControllers = void 0;
// import { AdminModel } from '../../admin/admin.model';
const user_model_1 = require("../user-modules/user.model");
const profile_model_1 = require("./profile.model");
const profile_service_1 = require("./profile.service");
const createProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileData = req.body;
        const { userId } = req.params;
        profileData.userId = userId;
        const result = yield profile_service_1.ProfileServices.createProfileIntoDB(profileData);
        profileData.profileId = result._id.toString();
        yield user_model_1.User.insertProfileToUserData(userId, profileData);
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.insertUserProfileToAdminUserData(
        //   adminId,
        //   userId,
        //   profileData,
        // );
        res.status(200).json({
            success: true,
            message: 'Profile is created successfully',
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
const getProfiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield profile_service_1.ProfileServices.getProfileFromDB();
        // console.log(result);
        res.status(200).json({
            success: true,
            message: 'Profiles are retrieved successfully',
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
const getSingleProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileId } = req.params;
        const result = yield profile_service_1.ProfileServices.getSingleProfileFromDB(profileId);
        res.status(200).json({
            success: true,
            message: 'Profile is retrieved successfully',
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
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileId } = req.params;
        const body = req.body;
        const result = yield profile_service_1.ProfileServices.updateProfile(profileId, body);
        // Update the related User document
        const profileData = yield profile_model_1.Profile.findById(profileId);
        const userId = profileData === null || profileData === void 0 ? void 0 : profileData.userId;
        yield user_model_1.User.updateUserProfileWhenProfileIsUpdated(userId, body);
        // admin update:
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.updateAdminUserProfileWhenProfileIsUpdated(
        //   adminId,
        //   userId,
        //   body,
        // );
        res.status(200).json({
            success: true,
            message: 'Profile is updated successfully',
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
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profileId } = req.params;
        const profileData = yield profile_model_1.Profile.findById(profileId);
        const userId = profileData === null || profileData === void 0 ? void 0 : profileData.userId;
        const result = yield profile_service_1.ProfileServices.deleteProfile(profileId);
        yield user_model_1.User.deleteUserProfileWhenProfileIsDeleted(userId);
        // admin delete:
        // const adminData = await AdminModel.find();
        // const adminId = adminData[0]?._id.toString();
        // await AdminModel.deleteAdminUserProfileWhenProfileIsDeleted(
        //   adminId,
        //   userId,
        // );
        // console.log(result);
        res.status(200).json({
            success: true,
            message: 'Profile is deleted successfully',
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
exports.ProfileControllers = {
    createProfile,
    getProfiles,
    getSingleProfile,
    updateProfile,
    deleteProfile,
};
