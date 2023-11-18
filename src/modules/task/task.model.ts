import mongoose from "mongoose";
import { Collections } from "../utils/enum";
import { ITaskDoc, ITaskModel } from "./task.interfaces";

const taskSchema = new mongoose.Schema<ITaskDoc, ITaskModel>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITaskDoc, ITaskModel>(
  Collections.taskCollection,
  taskSchema
);

export default Task;
