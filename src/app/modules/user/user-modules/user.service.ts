import IUser from './user.interface';
import { User } from './user.model';

// User services:
// create user:
const createUserIntoDB = async (user: IUser) => {
  const result = await User.create(user);
  return result;
};
// get user:
const getUserFromDB = async () => {
  const result = await User.find();
  return result;
};
// getSingle user:
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
// update user:
const updateUser = async (id: string, payload: IUser) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
// delete user:
const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
//

export const UserServices = {
  // user:
  createUserIntoDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateUser,
  deleteUser,
};
