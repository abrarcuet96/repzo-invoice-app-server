"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("./profile.controller");
const profileRouter = express_1.default.Router();
profileRouter.post('/:userId', profile_controller_1.ProfileControllers.createProfile);
profileRouter.get('/:profileId', profile_controller_1.ProfileControllers.getSingleProfile);
profileRouter.put('/:profileId', profile_controller_1.ProfileControllers.updateProfile);
profileRouter.delete('/:profileId', profile_controller_1.ProfileControllers.deleteProfile);
profileRouter.get('/', profile_controller_1.ProfileControllers.getProfiles);
exports.ProfileRoutes = profileRouter;
