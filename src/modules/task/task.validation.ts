import { ITaskCreatePayload } from "./task.interfaces";
import * as Joi from "joi";
import { CustomHelpers } from "joi";

const CreateTask: Record<keyof ITaskCreatePayload, any> = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  completed: Joi.boolean(),
};

export const CreateTaskSchema = {
  body: Joi.object().keys(CreateTask),
};

const objectId = (value: string, helpers: CustomHelpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message({ custom: '"{{#label}}" must be a valid mongo id' });
  }
  return value;
};

export const GetTaskSchema = {
  params: Joi.object().keys({
    taskId: Joi.string().required().custom(objectId),
  }),
};
