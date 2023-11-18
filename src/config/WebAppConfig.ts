import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { Model } from "mongoose";
import { MongoConfig } from "./MongoConfig";
import httpStatus = require("http-status");
import { ApiError, errorConverter, errorHandler } from "../modules/errors";
import router from "../routes";

export class WebAppConfig {
  public static Modals: Map<string, Model<any>>;

  private static instance: WebAppConfig;

  constructor() {}

  public static getInstance(): WebAppConfig {
    if (WebAppConfig.instance == null) {
      WebAppConfig.instance = new WebAppConfig();
    }
    return WebAppConfig.instance;
  }

  app = express();

  public async initApp() {
    this.app.use(express.json({ limit: "10kb" }));
    this.app.use(express.urlencoded({ limit: "10kb", extended: true }));
    this.app.use(bodyParser.urlencoded({ limit: "10kb", extended: true }));

    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

    this.app.use("/api", router);
    this.app.use((_req, _res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
    });
    this.app.use(errorConverter);
    this.app.use(errorHandler);
    this.app.listen(3000, () => {
      console.log("service started on 3000");
    });

    await this.initDB();
  }

  public async initDB() {
    await MongoConfig.DBConnection();
    console.log("db connected successfully...");
  }
}
