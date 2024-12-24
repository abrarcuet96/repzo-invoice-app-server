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
exports.ItemControllers = void 0;
const uuid_1 = require("uuid");
const user_model_1 = require("../user-modules/user.model");
const item_model_1 = require("./item.model");
const item_service_1 = require("./item.service");
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemData = req.body;
        const { userId } = req.params;
        itemData.userId = userId;
        const itemId = (0, uuid_1.v4)();
        itemData.itemId = itemId;
        const result = yield item_service_1.ItemServices.createItemIntoDB(itemData);
        yield user_model_1.User.insertItemToUserData(userId, itemData);
        res.status(200).json({
            success: true,
            message: 'Item is created successfully',
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
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const result = yield item_service_1.ItemServices.getItemFromDB(name);
        res.status(200).json({
            success: true,
            message: 'Items are retrieved successfully',
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
const getSingleItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.params;
        const result = yield item_service_1.ItemServices.getSingleItemFromDB(itemId);
        res.status(200).json({
            success: true,
            message: 'Item is retrieved successfully',
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
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.params;
        const body = req.body;
        const result = yield item_service_1.ItemServices.updateItem(itemId, body);
        const itemData = yield item_model_1.Item.findOne({ itemId });
        const userId = itemData === null || itemData === void 0 ? void 0 : itemData.userId;
        yield user_model_1.User.updateUserItemWhenItemIsUpdated(userId, itemId, body);
        res.status(200).json({
            success: true,
            message: 'Item is updated successfully',
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
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.params;
        const itemData = yield item_model_1.Item.findOne({ itemId });
        const userId = itemData === null || itemData === void 0 ? void 0 : itemData.userId;
        const result = yield item_service_1.ItemServices.deleteItem(itemId);
        yield user_model_1.User.deleteUserItemWhenItemIsDeleted(userId, itemId);
        res.status(200).json({
            success: true,
            message: 'Item is deleted successfully',
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
exports.ItemControllers = {
    createItem,
    getItems,
    getSingleItem,
    updateItem,
    deleteItem,
};
