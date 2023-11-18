import express, { Router } from "express";
import { validate } from "../modules/validate";
import { authValidation, authController, auth } from "../modules/auth";

const router: Router = Router();

router.post(
  "/register",
  validate(authValidation.AuthUser),
  authController.registerUser
);

router.post(
  "/login",
  validate(authValidation.AuthUser),
  authController.loginUser
);

export default router;
