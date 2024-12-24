"use strict";
// Item services:
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
exports.ItemServices = void 0;
const item_model_1 = require("./item.model");
// create item:
const createItemIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield item_model_1.Item.create(payload);
    return result;
});
// get item:
const getItemFromDB = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield item_model_1.Item.find({
        name: { $regex: new RegExp(name, 'i') },
    });
    return result;
});
// getSingle item:
const getSingleItemFromDB = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield item_model_1.Item.findOne({ itemId });
    return result;
});
// update item:
const updateItem = (itemId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield item_model_1.Item.findOneAndUpdate({ itemId }, payload, {
        new: true,
    });
    return result;
});
// delete item:
const deleteItem = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield item_model_1.Item.findOneAndDelete({ itemId });
    return result;
});
//
exports.ItemServices = {
    // item:
    createItemIntoDB,
    getItemFromDB,
    getSingleItemFromDB,
    updateItem,
    deleteItem,
};
