import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { tokenService } from "../token";
import * as authService from "./auth.service";

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.registerUser(req.body);
  console.log(user);
  res.status(200).send(user);
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.loginUser(req.body);
  console.log(user);
  const tokens = await tokenService.generateAuthTokens(user);
  console.log(tokens);
  res.send({ tokens });
});
