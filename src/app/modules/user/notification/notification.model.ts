import { model, Schema } from 'mongoose';
import INotification from './notification.interface';

const NotificationSchema = new Schema<INotification>({
  id: { type: String, required: [true, 'Notification ID is required'] },
  type: { type: String, required: [true, 'Type is required'] },
  message: { type: String, required: [true, 'Message is required'] },
  date: {
    type: String,
    required: [true, 'Date is required'],
    validate: {
      validator: (v) => !isNaN(new Date(v).getTime()),
      message: 'Invalid notification date',
    },
  },
  isRead: { type: Boolean, required: [true, 'Read status is required'] },
});
export const Notification = model<INotification>(
  'Notification',
  NotificationSchema,
);
