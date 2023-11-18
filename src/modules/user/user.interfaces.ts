import { Model, Document } from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  ValidateUser(value: string): Promise<boolean>;
}

export interface IUserWithTokens {
  user: IUserDoc;
}
