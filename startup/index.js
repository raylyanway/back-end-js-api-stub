import { appConfig } from "./config.js";
import { db } from "./db.js";
import { prod } from "./prod.js";
import { routes } from "./routes.js";
import { validation } from "./validation.js";

export const startup = (app) => {
  routes(app);
  db();
  appConfig();
  validation();
  prod(app);
};
