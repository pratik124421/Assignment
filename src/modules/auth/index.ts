import * as authController from "./auth.controller";
import auth from "./auth.middleware";
import * as authService from "./auth.service";
import * as authValidation from "./auth.validation";
import jwtStrategy from "./passport";
import * as AuthInterface from "./auth.interface";

export {
  authController,
  auth,
  authService,
  authValidation,
  jwtStrategy,
  AuthInterface,
};
