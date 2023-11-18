import mongoose from "mongoose";

export class MongoConfig {
  private static primaryurl = "mongodb://0.0.0.0:27017/Assignment";
  public static async DBConnection() {
    try {
      mongoose.connect(MongoConfig.primaryurl);
    } catch (error) {
      console.log(`Fetching records failed!`);
      console.log(error);
      return error;
    }
  }
}
