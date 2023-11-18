import mongoose from "mongoose";
import { IUserDoc, IUserModel, IUser } from "./user.interfaces";

import { hash, compare } from "bcrypt";

import { Collections } from "../utils/enum";
import { EnvironmentConfig } from "../../config/EnvironmentConfig";

const userSchema = new mongoose.Schema<IUserDoc, IUserModel>(
  {
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.method(
  "isPasswordMatch",
  async function (password: string): Promise<boolean> {
    const user = this;
    return compare(password, user.password);
  }
);

userSchema.pre("save", async function (next) {
  try {
    console.log("userrrrrrrrrr", this);
    const user = this;
    if (user.isModified("password")) {
      user.password = await hash(user.password, 8);
    }
    next();
  } catch (error) {
    // throw new Error('something went wrong');
    next(error); // if you pass any argument in next fun it will take it as a error
  }
});

userSchema.static(
  "ValidateUser",
  async function (value: string): Promise<boolean> {
    let user = await this.findOne({ email: value });
    return !!user;
  }
);

const User = mongoose.model<IUserDoc, IUserModel>(
  Collections.userCollection,
  userSchema
);

export default User;
