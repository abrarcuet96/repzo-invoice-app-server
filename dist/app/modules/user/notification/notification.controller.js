"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationControllers = void 0;
const notification_service_1 = require("./notification.service");
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notification: notificationData } = req.body;
        const result = yield notification_service_1.NotificationServices.createNotificationIntoDB(notificationData);
        res.status(200).json({
            success: true,
            message: 'Notification is created successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield notification_service_1.NotificationServices.getNotificationFromDB();
        res.status(200).json({
            success: true,
            message: 'Notifications are retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const getSingleNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId } = req.params;
        const result = yield notification_service_1.NotificationServices.getSingleNotificationFromDB(notificationId);
        res.status(200).json({
            success: true,
            message: 'Notification is retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const updateNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId } = req.params;
        const body = req.body;
        const result = yield notification_service_1.NotificationServices.updateNotification(notificationId, body);
        res.status(200).json({
            success: true,
            message: 'Notification is updated successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { notificationId } = req.params;
        const result = yield notification_service_1.NotificationServices.deleteNotification(notificationId);
        res.status(200).json({
            success: true,
            message: 'Notification is deleted successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
});
exports.NotificationControllers = {
    createNotification,
    getNotifications,
    getSingleNotification,
    updateNotification,
    deleteNotification,
};
