import express from "express";
import debug from "debug";
import { logger } from "./startup/logging.js";
import { startup } from "./startup/index.js";

const app = express();
startup(app);

const devDebug = debug("app:dev");
devDebug("Dev is started");

const port = process.env.NODE_ENV === "test" ? 0 : process.env.PORT || 3000;
export const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);
