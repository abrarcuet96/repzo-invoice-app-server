import { Model } from 'mongoose';
import IProfile from '../profile/profile.interface';

interface IUser {
  name: string;
  email: string;
  role: string;
  profile?: IProfile;
}
export interface UserModel extends Model<IProfile> {
  insertProfileToUserData(
    userId: string,
    profileData: IProfile,
  ): Promise<IProfile | null>;
  updateUserProfileWhenProfieIsUpdated(
    userId: string | undefined,
    profileBody: object,
  ): Promise<IProfile | null>;
}
export default IUser;
