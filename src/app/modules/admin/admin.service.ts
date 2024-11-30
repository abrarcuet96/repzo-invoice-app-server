// admin services:
import { IAdmin } from './admin.interface';
import { AdminModel } from './admin.model';

// create admin:
const createAdminIntoDB = async (user: IAdmin) => {
  const result = await AdminModel.create(user);
  return result;
};
// get admin:
const getAdminFromDB = async () => {
  const result = await AdminModel.find();
  return result;
};
// getSingle admin:
const getSingleAdminFromDB = async (id: string) => {
  const result = await AdminModel.findById(id);
  return result;
};
// update admin:
const updateAdmin = async (id: string, payload: IAdmin) => {
  const result = await AdminModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
// delete admin:
const deleteAdmin = async (id: string) => {
  const result = await AdminModel.findByIdAndDelete(id);
  return result;
};
//

export const AdminServices = {
  // admin:
  createAdminIntoDB,
  getAdminFromDB,
  getSingleAdminFromDB,
  updateAdmin,
  deleteAdmin,
};
