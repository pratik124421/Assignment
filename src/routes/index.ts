import { Router } from "express";
import authRoute from "./auth.route";

const router = Router();

interface RouterInterface {
  path: string;
  route: Router;
}

const defaultRoutes: RouterInterface[] = [
  {
    path: "/auth",
    route: authRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
