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
  validate(taskValidation.TaskIdParamSchema),
  taskController.getTask
);

TaskRouter.route("/remove/:taskId").delete(
  auth,
  validate(taskValidation.TaskIdParamSchema),
  taskController.removeTask
);

TaskRouter.route("/update/:taskId").patch(
  auth,
  validate(taskValidation.UpdateTaskSchema),
  taskController.updateTask
);

TaskRouter.route("/all").get(auth, taskController.getAllTasks);

export default TaskRouter;
