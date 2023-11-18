import { Request, Response, NextFunction } from "express";
import * as passport from "passport";
import * as httpStatus from "http-status";
import ApiError from "../errors/ApiError";
import { IUserDoc } from "../user/user.interfaces";

const verifyCallback =
  (req: Request, resolve: any, reject: any) =>
  async (err: Error, user: IUserDoc, info: string) => {
    console.log("----------=========--------------", info, user);
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;

    resolve();
  };

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  new Promise<void>((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject)
    )(req, res, next);
  })
    .then(() => {
      console.log("authenticated..", req.user);
      next();
    })
    .catch((err) => next(err));

export default authMiddleware;
