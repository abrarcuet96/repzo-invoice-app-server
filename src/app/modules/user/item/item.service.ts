// Item services:

import IItem from './item.interface';
import { Item } from './item.model';

// create item:
const createItemIntoDB = async (payload: IItem) => {
  const result = await Item.create(payload);
  return result;
};
// get item:
const getItemFromDB = async (name: string) => {
  const result = await Item.find({
    name: { $regex: new RegExp(name, 'i') },
  });
  return result;
};
// getSingle item:
const getSingleItemFromDB = async (itemId: string) => {
  const result = await Item.findOne({ itemId });
  return result;
};
// update item:
const updateItem = async (itemId: string, payload: IItem) => {
  const result = await Item.findOneAndUpdate({ itemId }, payload, {
    new: true,
  });
  return result;
};
// delete item:
const deleteItem = async (itemId: string) => {
  const result = await Item.findOneAndDelete({ itemId });
  return result;
};
//
export const ItemServices = {
  // item:
  createItemIntoDB,
  getItemFromDB,
  getSingleItemFromDB,
  updateItem,
  deleteItem,
};
