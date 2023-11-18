import * as moment from "moment-timezone";
import { WebAppConfig } from "./config/WebAppConfig";
import { schedulerController } from "./modules/Jobs/index";
WebAppConfig.getInstance().initApp();
schedulerController.checkTaskStatusScheduler();
console.log(moment().tz("Asia/Kolkata").toISOString());
