import { Request, Response } from 'express';
// import { AdminModel } from '../../admin/admin.model';
import { User } from '../user-modules/user.model';
import { Profile } from './profile.model';
import { ProfileServices } from './profile.service';

const createProfile = async (req: Request, res: Response) => {
  try {
    const profileData = req.body;
    const { userId } = req.params;
    profileData.userId = userId;
    const result = await ProfileServices.createProfileIntoDB(profileData);

    profileData.profileId = result._id.toString();
    await User.insertProfileToUserData(userId, profileData);
    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.insertUserProfileToAdminUserData(
    //   adminId,
    //   userId,
    //   profileData,
    // );
    res.status(200).json({
      success: true,
      message: 'Profile is created successfully',
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

const getProfiles = async (req: Request, res: Response) => {
  try {
    const result = await ProfileServices.getProfileFromDB();
    // console.log(result);
    res.status(200).json({
      success: true,
      message: 'Profiles are retrieved successfully',
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
const getSingleProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const result = await ProfileServices.getSingleProfileFromDB(profileId);
    res.status(200).json({
      success: true,
      message: 'Profile is retrieved successfully',
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
const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const body = req.body;
    const result = await ProfileServices.updateProfile(profileId, body);
    // Update the related User document

    const profileData = await Profile.findById(profileId);
    const userId = profileData?.userId;
    await User.updateUserProfileWhenProfileIsUpdated(userId, body);
    // admin update:
    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.updateAdminUserProfileWhenProfileIsUpdated(
    //   adminId,
    //   userId,
    //   body,
    // );
    res.status(200).json({
      success: true,
      message: 'Profile is updated successfully',
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
const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { profileId } = req.params;
    const profileData = await Profile.findById(profileId);
    const userId = profileData?.userId;
    const result = await ProfileServices.deleteProfile(profileId);
    await User.deleteUserProfileWhenProfileIsDeleted(userId);
    // admin delete:
    // const adminData = await AdminModel.find();
    // const adminId = adminData[0]?._id.toString();
    // await AdminModel.deleteAdminUserProfileWhenProfileIsDeleted(
    //   adminId,
    //   userId,
    // );
    // console.log(result);
    res.status(200).json({
      success: true,
      message: 'Profile is deleted successfully',
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
export const ProfileControllers = {
  createProfile,
  getProfiles,
  getSingleProfile,
  updateProfile,
  deleteProfile,
};
