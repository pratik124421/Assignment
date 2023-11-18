const cron = require("node-cron");
import { schedulerService } from ".";
import { catchAsync } from "../utils";

export const checkTaskStatusScheduler = async () => {
  cron.schedule("* * 0 * * 0-7", () => {
    console.log("scheduler started....");
    schedulerService
      .checkTaskStatus()
      .then((res) => {
        console.log("result:::: ", res);
        console.log("scheduler ended... ");
      })
      .catch((err) => {
        console.log("some error occured in scheduler...");
      });
  });
};
