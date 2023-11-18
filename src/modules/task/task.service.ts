import * as httpStatus from "http-status";
import { ApiError } from "../errors";
import { ITask, ITaskDoc } from "./task.interfaces";
import Task from "./task.model";

export const createTask = async (TaskObj: ITask): Promise<ITaskDoc> => {
  try {
    return await Task.create(TaskObj);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request");
  }
};
