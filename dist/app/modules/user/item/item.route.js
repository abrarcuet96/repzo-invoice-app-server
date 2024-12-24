"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const item_controller_1 = require("./item.controller");
const itemRouter = express_1.default.Router();
itemRouter.post('/:userId', item_controller_1.ItemControllers.createItem);
itemRouter.get('/:itemId', item_controller_1.ItemControllers.getSingleItem);
itemRouter.put('/:itemId', item_controller_1.ItemControllers.updateItem);
itemRouter.delete('/:itemId', item_controller_1.ItemControllers.deleteItem);
itemRouter.get('/', item_controller_1.ItemControllers.getItems);
exports.ItemRoutes = itemRouter;
