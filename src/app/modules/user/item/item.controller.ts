import { Request, Response } from 'express';
import { generateNewId } from '../../../utils/generateId';
import { User } from '../user-modules/user.model';
import { Item } from './item.model';
import { ItemServices } from './item.service';

const createItem = async (req: Request, res: Response) => {
  try {
    const itemData = req.body;
    const { userId } = req.params;
    itemData.userId = userId;
    const itemId = await generateNewId(Item, userId, 'itemId', 'ITE');
    itemData.itemId = itemId;
    const result = await ItemServices.createItemIntoDB(itemData);

    await User.insertItemToUserData(userId, itemData);
    res.status(200).json({
      success: true,
      message: 'Item is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getItems = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const result = await ItemServices.getItemFromDB(name as string);
    res.status(200).json({
      success: true,
      message: 'Items are retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const getSingleItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const result = await ItemServices.getSingleItemFromDB(itemId);
    res.status(200).json({
      success: true,
      message: 'Item is retrieved successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const updateItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const body = req.body;
    const result = await ItemServices.updateItem(itemId, body);

    const itemData = await Item.findOne({ itemId });
    const userId = itemData?.userId;
    await User.updateUserItemWhenItemIsUpdated(userId, itemId, body);
    res.status(200).json({
      success: true,
      message: 'Item is updated successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const deleteItem = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.params;
    const itemData = await Item.findOne({ itemId });
    const userId = itemData?.userId;
    const result = await ItemServices.deleteItem(itemId);
    await User.deleteUserItemWhenItemIsDeleted(userId, itemId);
    res.status(200).json({
      success: true,
      message: 'Item is deleted successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
export const ItemControllers = {
  createItem,
  getItems,
  getSingleItem,
  updateItem,
  deleteItem,
};
