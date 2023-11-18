import { Request, Response } from "express";
import httpStatus = require("http-status");
import { ApiError } from "../errors";
import { catchAsync } from "../utils";
import { ITaskDoc } from "./task.interfaces";
import * as taskService from "./task.service";

export const ceateTask = catchAsync(async (req: Request, res: Response) => {
  const taskObj = { ...req.body, userId: req.user._id };
  const task = await taskService.createTask(taskObj);
  console.log(task);
  res.status(200).send(task);
});

export const getTask = catchAsync(async (req: Request, res: Response) => {
  const task = await taskService.getTask(req.params["taskId"], req.user._id);
  console.log("taskkkkk :", task);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task does not exist");
  }
  res.status(200).send(task);
});

export const removeTask = catchAsync(async (req: Request, res: Response) => {
  const task: any = await taskService.removeTask(
    req.params["taskId"],
    req.user._id
  );
  console.log("taskkkkk :", task);
  if (!task || task.deletedCount == 0) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task does not exist");
  }
  res.status(200).send({ message: "Task Removed Successfully" });
});
