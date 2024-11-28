import express from 'express';
import { ProfileControllers } from './profile.controller';
const profileRouter = express.Router();

profileRouter.post('/:userId', ProfileControllers.createProfile);
profileRouter.get('/:profileId', ProfileControllers.getSingleProfile);
profileRouter.get('/', ProfileControllers.getProfiles);
profileRouter.put('/:profileId', ProfileControllers.updateProfile);
profileRouter.delete('/:profileId', ProfileControllers.deleteProfile);

export const ProfileRoutes = profileRouter;
