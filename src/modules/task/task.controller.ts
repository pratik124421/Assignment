import { Request, Response } from "express";
import { catchAsync } from "../utils";
import * as taskService from "./task.service";

export const ceateTask = catchAsync(async (req: Request, res: Response) => {
  const taskObj = { ...req.body, userId: req.user._id };
  const user = await taskService.createTask(taskObj);
  console.log(user);
  res.status(200).send(user);
});
