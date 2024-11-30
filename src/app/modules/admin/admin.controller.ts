import { Request, Response } from 'express';
import { AdminServices } from './admin.service';

const getAdmin = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.getAdminFromDB();
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

const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { adminId } = req.params;
    const body = req.body;
    const result = await AdminServices.updateAdmin(adminId, body);
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
const getSingleAdmin = async (req: Request, res: Response) => {
  try {
    const { adminId } = req.params;
    const result = await AdminServices.getSingleAdminFromDB(adminId);
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
export const AdminControllers = {
  getAdmin,
  updateAdmin,
  getSingleAdmin,
};
