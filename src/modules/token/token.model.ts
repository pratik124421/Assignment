import mongoose from "mongoose";
import tokenTypes from "./token.types";
import { ITokenDoc, ITokenModel } from "./token.interfaces";
import { Collections } from "../utils/enum";
const tokenSchema = new mongoose.Schema<ITokenDoc, ITokenModel>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.ACCESS],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model<ITokenDoc, ITokenModel>(
  Collections.tokenCollection,
  tokenSchema
);

export default Token;
