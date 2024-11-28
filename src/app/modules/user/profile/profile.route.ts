import express from 'express';
import { ProfileControllers } from './profile.controller';
const profileRouter = express.Router();

profileRouter.post('/:userId', ProfileControllers.createProfile);
profileRouter.get('/:profileId', ProfileControllers.getSingleProfile);
profileRouter.put('/:profileId', ProfileControllers.updateProfile);
profileRouter.delete('/:profileId', ProfileControllers.deleteProfile);
profileRouter.get('/', ProfileControllers.getProfiles);

export const ProfileRoutes = profileRouter;
