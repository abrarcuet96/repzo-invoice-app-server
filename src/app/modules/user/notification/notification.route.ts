import express from 'express';
import { NotificationControllers } from './notification.controller';
const notificationRouter = express.Router();

notificationRouter.post('/', NotificationControllers.createNotification);
notificationRouter.get(
  '/:notificationId',
  NotificationControllers.getSingleNotification,
);
notificationRouter.get('/', NotificationControllers.getNotifications);
notificationRouter.put(
  '/:notificationId',
  NotificationControllers.updateNotification,
);
notificationRouter.delete(
  '/:notificationId',
  NotificationControllers.deleteNotification,
);

export const NotificationRoutes = notificationRouter;
