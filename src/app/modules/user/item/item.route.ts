import express from 'express';
import { ItemControllers } from './item.controller';
const itemRouter = express.Router();

itemRouter.post('/', ItemControllers.createItem);
itemRouter.get('/:itemId', ItemControllers.getSingleItem);
itemRouter.get('/', ItemControllers.getItems);
itemRouter.put('/:itemId', ItemControllers.updateItem);
itemRouter.delete('/:itemId', ItemControllers.deleteItem);

export const ItemRoutes = itemRouter;
