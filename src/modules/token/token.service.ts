import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import { Moment } from "moment";
import mongoose from "mongoose";
import * as httpStatus from "http-status";
import Token from "./token.model";
import ApiError from "../errors/ApiError";
import tokenTypes from "./token.types";
import { AccessAndRefreshTokens, ITokenDoc } from "./token.interfaces";
import { IUserDoc } from "../user/user.interfaces";
import { userService } from "../user";
import { EnvironmentConfig } from "../../config/EnvironmentConfig";

export const generateToken = (
  userId: mongoose.Types.ObjectId,
  expires: Moment,
  type: string,
  secret: string = EnvironmentConfig.getInstance().JWT_Token_Secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

export const saveToken = async (
  token: string,
  userId: mongoose.Types.ObjectId,
  expires: Moment,
  type: string
): Promise<ITokenDoc> => {
  const tokenDoc = await Token.create({
    token,
    userId: userId,
    expires: expires.toDate(),
    type,
  });
  return tokenDoc;
};

export const verifyToken = async (
  token: string,
  type: string
): Promise<ITokenDoc> => {
  const payload = jwt.verify(
    token,
    EnvironmentConfig.getInstance().JWT_Token_Secret
  );
  if (typeof payload.sub !== "string") {
    throw new ApiError(httpStatus.BAD_REQUEST, "bad user");
  }
  const tokenDoc = await Token.findOne({
    token,
    type,
    userId: payload.sub,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

export const generateAuthTokens = async (
  user: IUserDoc
): Promise<AccessAndRefreshTokens> => {
  const accessTokenExpires = moment().add(20, "minutes");
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  await saveToken(accessToken, user.id, accessTokenExpires, tokenTypes.ACCESS);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};
