import * as httpStatus from "http-status";
import ApiError from "../errors/ApiError";
import { User, userService } from "../user";
import { IUser, IUserDoc } from "../user/user.interfaces";

export const registerUser = async (AuthObj: IUser): Promise<IUserDoc> => {
  try {
    const { email } = AuthObj;
    let user: IUserDoc;

    user = await User.findOne({ email });
    if (user) {
      throw new ApiError(httpStatus.CONFLICT, "Email Alredy Exist");
    } else {
      user = await userService.createUser(AuthObj);
    }
    return user;
  } catch (error) {
    throw new ApiError(httpStatus.CONFLICT, "Email Alredy Exist");
  }
};

export const loginUser = async (AuthObj: IUser): Promise<IUserDoc> => {
  const { email, password } = AuthObj;
  let user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email does not exist");
  }
  if (await user.isPasswordMatch(password)) {
    return user;
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect Password");
  }
};
