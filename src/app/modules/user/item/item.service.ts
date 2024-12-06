// Item services:

import IItem from './item.interface';
import { Item } from './item.model';

// create item:
const createItemIntoDB = async (payload: IItem) => {
  const result = await Item.create(payload);
  return result;
};
// get item:
const getItemFromDB = async () => {
  const result = await Item.find();
  return result;
};
// getSingle item:
const getSingleItemFromDB = async (id: string) => {
  const result = await Item.findById(id);
  return result;
};
// update item:
const updateItem = async (id: string, payload: IItem) => {
  const result = await Item.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
// delete item:
const deleteItem = async (id: string) => {
  const result = await Item.findByIdAndDelete(id);
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
