import express from 'express';
import { ItemControllers } from './item.controller';
const itemRouter = express.Router();

itemRouter.post('/:userId', ItemControllers.createItem);
itemRouter.get('/:itemId', ItemControllers.getSingleItem);
itemRouter.put('/:itemId', ItemControllers.updateItem);
itemRouter.delete('/:itemId', ItemControllers.deleteItem);
itemRouter.get('/', ItemControllers.getItems);

export const ItemRoutes = itemRouter;
