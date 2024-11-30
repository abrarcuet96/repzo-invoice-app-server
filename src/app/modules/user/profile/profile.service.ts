// Profile services:

import IProfile from './profile.interface';
import { Profile } from './profile.model';

// create profile:
const createProfileIntoDB = async (payload: IProfile) => {
  const result = await Profile.create(payload);
  return result;
};
// get profile:
const getProfileFromDB = async () => {
  const result = await Profile.find();
  return result;
};
// getSingle profile:
const getSingleProfileFromDB = async (id: string) => {
  const result = await Profile.findById(id);
  return result;
};
// update profile:
const updateProfile = async (id: string, payload: IProfile) => {
  const result = await Profile.findByIdAndUpdate(id, payload,{
    new: true,
  });
  return result;
};
// delete profile:
const deleteProfile = async (id: string) => {
  const result = await Profile.findByIdAndDelete(id);
  return result;
};
//
export const ProfileServices = {
  // profile:
  createProfileIntoDB,
  getProfileFromDB,
  getSingleProfileFromDB,
  updateProfile,
  deleteProfile,
};
