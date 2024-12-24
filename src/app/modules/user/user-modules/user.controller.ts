import { Request, Response } from 'express';
// import { AdminModel } from '../../admin/admin.model';
// import { AdminServices } from '../../admin/admin.service';
// import AdminValidationSchema from '../../admin/admin.validation';
import { UserServices } from './user.service';
import UserValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodUserParsedData = UserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodUserParsedData);
    userData.userId = result._id.toString();

    // await AdminModel.insertUserToAdminData(adminId, userData);
    res.status(200).json({
      success: true,
      message: 'User is created successfully',
      data: result,
    });
    // } else if (userData.role === 'admin') {
    //   // data validation using zod:
    //   const zodParsedAdminData = AdminValidationSchema.parse(userData);
    //   const result = await AdminServices.createAdminIntoDB(zodParsedAdminData);
    //   res.status(200).json({
    //     success: true,
    //     message: 'Admin is created successfully',
    //     data: result,
    //   });
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully',
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
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const result = await UserServices.getSingleUserFromDB(email);
    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
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
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const body = req.body;
    const result = await UserServices.updateUser(userId, body);
    res.status(200).json({
      success: true,
      message: 'User is updated successfully',
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
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: 'User is deleted successfully',
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
export const UserControllers = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
