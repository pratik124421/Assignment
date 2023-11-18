import * as Joi from "joi";
import { IUser } from "../user/user.interfaces";

const userValidation: Record<keyof IUser, any> = {
  email: Joi.string().required(),
  password: Joi.string().required(),
};
export const AuthUser = {
  body: Joi.object().keys(userValidation),
};
