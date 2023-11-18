import { Router } from "express";
import { validate } from "../modules/validate";
import { taskController, taskValidation } from "../modules/task";
import { auth } from "../modules/auth";

const TaskRouter: Router = Router();

TaskRouter.route("/add").post(
  auth,
  validate(taskValidation.CreateTaskSchema),
  taskController.ceateTask
);

TaskRouter.route("/get/:taskId").get(
  auth,
  validate(taskValidation.GetTaskSchema),
  taskController.getTask
);

export default TaskRouter;
