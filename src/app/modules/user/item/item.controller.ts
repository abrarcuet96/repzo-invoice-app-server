import { Request, Response } from 'express';
import { ItemServices } from './item.service';

const createItem = async (req: Request, res: Response) => {
  try {
    const { item: itemData } = req.body;

    const result = await ItemServices.createItemIntoDB(itemData);
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
    console.log(result);
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
    console.log(result);
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
    console.log(result);
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
    const result = await ItemServices.deleteItem(itemId);
    console.log(result);
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
