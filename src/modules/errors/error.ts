/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import * as httpStatus from "http-status";
import { EnvironmentConfig } from "../../config/EnvironmentConfig";
import ApiError from "./ApiError";

export const errorConverter = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  let error = err;
  console.log(err.stack);

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? error.statusCode
      : httpStatus.INTERNAL_SERVER_ERROR;
    const message: string = error.message || `${httpStatus[statusCode]}`;
    error = new ApiError(statusCode, message);
  }
  next(error);
};

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let { statusCode, message } = err;

  const response = {
    code: statusCode,
    message,
    ...(EnvironmentConfig.getInstance().Environment === "Dev" && {
      stack: err.stack,
    }),
  };

  res.status(statusCode).send(response);
};
