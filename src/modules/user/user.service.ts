import User from "./user.model";
import { IUser, IUserDoc } from "./user.interfaces";

export const createUser = async (userBody: IUser): Promise<IUserDoc> => {
  return User.create(userBody);
};
