import * as httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import * as userService from "./user.service";
import { ApiError } from "../errors";
import { catchAsync } from "../utils";

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  console.log("userdata : ", user);
  res.status(httpStatus.CREATED).send(user);
});
