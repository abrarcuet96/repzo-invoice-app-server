import { z } from 'zod';

export const NotificationValidationSchema = z.object({
  userId: z.string().optional(),
  type: z.string().min(1, 'Type is required'),
  message: z.string().min(1, 'Message is required'),
  date: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: 'Invalid notification date',
  }),
  isRead: z.boolean(),
});

export default NotificationValidationSchema;
