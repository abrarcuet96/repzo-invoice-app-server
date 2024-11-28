// Notification services:

import INotification from './notification.interface';
import { Notification } from './notification.model';

// create notification:
const createNotificationIntoDB = async (payload: INotification) => {
  const result = await Notification.create(payload);
  return result;
};
// get notification:
const getNotificationFromDB = async () => {
  const result = await Notification.find();
  return result;
};
// getSingle notification:
const getSingleNotificationFromDB = async (id: string) => {
  const result = await Notification.findById({ id });
  return result;
};
// update notification:
const updateNotification = async (id: string, payload: INotification) => {
  const result = await Notification.findByIdAndUpdate(id, payload);
  return result;
};
// delete notification:
const deleteNotification = async (id: string) => {
  const result = await Notification.findByIdAndDelete(id);
  return result;
};
//
export const NotificationServices = {
  // notification:
  createNotificationIntoDB,
  getNotificationFromDB,
  getSingleNotificationFromDB,
  updateNotification,
  deleteNotification,
};
