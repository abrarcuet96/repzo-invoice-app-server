import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';
import INotification from './notification.interface';
const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: String, required: false },
    type: { type: String, required: true },
    message: { type: String, required: true },
    date: {
      type: String,
      required: true,
    },
    isRead: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
        ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');

        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = createdAt.format('MM/DD/YYYY, hh:mm A');
        ret.updatedAt = updatedAt.format('MM/DD/YYYY, hh:mm A');

        return ret;
      },
    },
  },
);
export const Notification = model<INotification>(
  'Notification',
  NotificationSchema,
);
export default NotificationSchema;
