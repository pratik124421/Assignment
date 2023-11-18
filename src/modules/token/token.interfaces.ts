import { Document, Model } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { ObjectID } from "bson";

export interface IToken {
  token: string;
  userId: ObjectID;
  type: string;
  expires: Date;
}

export interface ITokenDoc extends IToken, Document {}

export interface ITokenModel extends Model<ITokenDoc> {}

export interface IPayload extends JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}

export interface TokenPayload {
  token: string;
  expires: Date;
}

export interface AccessAndRefreshTokens {
  access: TokenPayload;
}
