import { Request, Response } from 'express';
import { NotificationServices } from './notification.service';

const createNotification = async (req: Request, res: Response) => {
  try {
    const { notification: notificationData } = req.body;

    const result =
      await NotificationServices.createNotificationIntoDB(notificationData);
    res.status(200).json({
      success: true,
      message: 'Notification is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getNotifications = async (req: Request, res: Response) => {
  try {
    const result = await NotificationServices.getNotificationFromDB();
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Notifications are retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const getSingleNotification = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    const result =
      await NotificationServices.getSingleNotificationFromDB(notificationId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Notification is retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const updateNotification = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    const body = req.body;
    const result = await NotificationServices.updateNotification(
      notificationId,
      body,
    );
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Notification is updated successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    const result =
      await NotificationServices.deleteNotification(notificationId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Notification is deleted successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
export const NotificationControllers = {
  createNotification,
  getNotifications,
  getSingleNotification,
  updateNotification,
  deleteNotification,
};
