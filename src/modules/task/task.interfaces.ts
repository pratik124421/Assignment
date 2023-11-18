import { ObjectID } from "bson";
import mongoose, { Document, Model } from "mongoose";

export interface ITask {
  userId: ObjectID;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}

export interface ITaskDoc extends ITask, Document {}

export interface ITaskModel extends Model<ITaskDoc> {}

export type ITaskCreatePayload = Omit<ITask, "userId">;
