import { Task } from "../task";
import * as moment from "moment-timezone";

export const checkTaskStatus = async () => {
  const today = moment().tz("Asia/Kolkata");
  return Task.updateMany(
    { dueDate: { $lt: today } },
    { $set: { completed: true } }
  );
};
