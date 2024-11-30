import { model, Schema } from 'mongoose';
import INotification from './notification.interface';

const NotificationSchema = new Schema<INotification>({
  userId: { type: String, required: false },
  type: { type: String, required: true },
  message: { type: String, required: true },
  date: {
    type: String,
    required: true,
  },
  isRead: { type: Boolean, required: true },
});
export const Notification = model<INotification>(
  'Notification',
  NotificationSchema,
);
export default NotificationSchema;
