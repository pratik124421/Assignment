import express, { Router } from "express";
import { validate } from "../modules/validate";
import { authValidation, authController } from "../modules/auth";

const AuthRouter: Router = Router();

AuthRouter.post(
  "/register",
  validate(authValidation.AuthUser),
  authController.registerUser
);

AuthRouter.post(
  "/login",
  validate(authValidation.AuthUser),
  authController.loginUser
);

export default AuthRouter;
