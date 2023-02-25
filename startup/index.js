import { routes } from "./routes.js";
import { db } from "./db.js";
import { appConfig } from "./config.js";
import { validation } from "./validation.js";
import { prod } from "./prod.js";

export const startup = (app) => {
  routes(app);
  db();
  appConfig();
  validation();
  prod(app);
};
