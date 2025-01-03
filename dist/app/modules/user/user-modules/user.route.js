"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userRouter = express_1.default.Router();
userRouter.post('/', user_controller_1.UserControllers.createUser);
userRouter.get('/', user_controller_1.UserControllers.getUsers);
userRouter.get('/:email', user_controller_1.UserControllers.getSingleUser);
userRouter.put('/:userId', user_controller_1.UserControllers.updateUser);
userRouter.delete('/:userId', user_controller_1.UserControllers.deleteUser);
exports.UserRoutes = userRouter;
