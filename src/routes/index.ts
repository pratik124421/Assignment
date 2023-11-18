import { Router } from "express";
import AuthRouter from "./auth.route";
import TaskRouter from "./task.route";

const router = Router();

interface RouterInterface {
  path: string;
  route: Router;
}

const defaultRoutes: RouterInterface[] = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/task",
    route: TaskRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
