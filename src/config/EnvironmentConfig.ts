import { config } from "dotenv";

import path = require("path");

export class EnvironmentConfig {
  public static instance: EnvironmentConfig;

  public Domain: string;
  public JWT_Token_Secret: string;
  public Environment: string;

  public static getInstance() {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  constructor() {
    const ENV_FILE = path.join(__dirname, "../..", ".env");
    config({ path: ENV_FILE });

    this.Domain = process.env.Domain;
    this.JWT_Token_Secret = process.env.JWT_Token_Secret;
    this.Environment = process.env.Environment;
  }
}
