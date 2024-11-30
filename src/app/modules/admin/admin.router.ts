import express from 'express';
import { UserControllers } from '../user/user-modules/user.controller';
import { AdminControllers } from './admin.controller';
const adminRouter = express.Router();

adminRouter.post('/', UserControllers.createUser);
adminRouter.get('/', AdminControllers.getAdmin);
adminRouter.put('/:adminId', AdminControllers.updateAdmin);
adminRouter.get('/:adminId', AdminControllers.getSingleAdmin);

export const AdminRoutes = adminRouter;
