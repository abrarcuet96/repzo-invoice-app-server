"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationValidationSchema = void 0;
const zod_1 = require("zod");
exports.NotificationValidationSchema = zod_1.z.object({
    userId: zod_1.z.string().optional(),
    type: zod_1.z.string().min(1, 'Type is required'),
    message: zod_1.z.string().min(1, 'Message is required'),
    date: zod_1.z.string().refine((val) => !isNaN(new Date(val).getTime()), {
        message: 'Invalid notification date',
    }),
    isRead: zod_1.z.boolean(),
});
exports.default = exports.NotificationValidationSchema;
