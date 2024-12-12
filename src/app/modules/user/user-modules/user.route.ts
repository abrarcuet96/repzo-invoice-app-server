import express from 'express';
import { UserControllers } from './user.controller';
const userRouter = express.Router();

userRouter.post('/', UserControllers.createUser);
userRouter.get('/', UserControllers.getUsers);
userRouter.get('/:email', UserControllers.getSingleUser);
userRouter.put('/:userId', UserControllers.updateUser);
userRouter.delete('/:userId', UserControllers.deleteUser);

export const UserRoutes = userRouter;
