import { Request, Response } from 'express';
import { CustomerUserServices } from './customerUser.service';
const getSingleCustomerUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const result =
      await CustomerUserServices.getSingleCustomerUserFromDB(email);
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
export const CustomerUserController = {
  getSingleCustomerUser,
};
