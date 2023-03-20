import { Express } from "express";

import { config } from "./config";
import { db } from "./db";
import { prod } from "./prod";
import { routes } from "./routes";

export { logger } from "./logging";

export const startup = (app: Express) => {
  routes(app);
  db();
  config();
  prod(app);
};
