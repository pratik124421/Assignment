import * as httpStatus from "http-status";
import mongoose from "mongoose";
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

export const getTask = async (
  _id: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId
): Promise<ITaskDoc> => {
  try {
    console.log("=================", _id, userId);
    return await Task.findOne({ _id, userId });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request");
  }
};

export const removeTask = async (
  _id: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId
): Promise<ITaskDoc> => {
  try {
    console.log("=================", _id, userId);
    return await Task.remove({ _id, userId });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Bad Request");
  }
};
