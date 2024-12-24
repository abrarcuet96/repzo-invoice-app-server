"use strict";
// Notification services:
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
exports.NotificationServices = void 0;
const notification_model_1 = require("./notification.model");
// create notification:
const createNotificationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.create(payload);
    return result;
});
// get notification:
const getNotificationFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.find();
    return result;
});
// getSingle notification:
const getSingleNotificationFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.findById({ id });
    return result;
});
// update notification:
const updateNotification = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.findByIdAndUpdate(id, payload);
    return result;
});
// delete notification:
const deleteNotification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.findByIdAndDelete(id);
    return result;
});
//
exports.NotificationServices = {
    // notification:
    createNotificationIntoDB,
    getNotificationFromDB,
    getSingleNotificationFromDB,
    updateNotification,
    deleteNotification,
};
