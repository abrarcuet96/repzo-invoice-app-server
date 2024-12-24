"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("./notification.controller");
const notificationRouter = express_1.default.Router();
notificationRouter.post('/', notification_controller_1.NotificationControllers.createNotification);
notificationRouter.get('/:notificationId', notification_controller_1.NotificationControllers.getSingleNotification);
notificationRouter.get('/', notification_controller_1.NotificationControllers.getNotifications);
notificationRouter.put('/:notificationId', notification_controller_1.NotificationControllers.updateNotification);
notificationRouter.delete('/:notificationId', notification_controller_1.NotificationControllers.deleteNotification);
exports.NotificationRoutes = notificationRouter;
