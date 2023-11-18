import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import tokenTypes from "../token/token.types";
import User from "../user/user.model";
import { IPayload } from "../token/token.interfaces";
import { EnvironmentConfig } from "../../config/EnvironmentConfig";

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: EnvironmentConfig.getInstance().JWT_Token_Secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: IPayload, done) => {
    try {
      console.log(":::::::::::::::::", payload.sub);
      const user = await User.findOne({ where: { id: payload.sub } });
      console.log("user data: ", user);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      console.log("-------------------------------------");
      done(error, false);
    }
  }
);

export default jwtStrategy;
