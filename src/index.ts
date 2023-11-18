import { WebAppConfig } from "./config/WebAppConfig";
import * as schedulerController from "./modules/Jobs/scheduler.controller";
WebAppConfig.getInstance().initApp();
schedulerController.checkTaskStatusScheduler();
