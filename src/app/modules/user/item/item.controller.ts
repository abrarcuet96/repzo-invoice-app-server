import { Request, Response } from 'express';
import { User } from '../user-modules/user.model';
import { Item } from './item.model';
import { ItemServices } from './item.service';

const createItem = async (req: Request, res: Response) => {
  try {
    const itemData = req.body;
    const { userId } = req.params;
    itemData.userId = userId;
    const result = await ItemServices.createItemIntoDB(itemData);

    itemData.itemId = result._id.toString();

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
    const result = await ItemServices.getItemFromDB();
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

    const itemData = await Item.findById(itemId);
    const userId = itemData?.userId;
    const itemID = itemData?._id?.toString();
    await User.updateUserItemWhenItemIsUpdated(userId, itemID, body);
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
    const itemData = await Item.findById(itemId);
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
