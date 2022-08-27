// const winston = require("winston");
import express from "express";
import debug from "debug";
import { logger } from "./startup/logging.js";
import { routes } from "./startup/routes.js";
import { db } from "./startup/db.js";
import { appConfig } from "./startup/config.js";
import { validation } from "./startup/validation.js";
import { prod } from "./startup/prod.js";

const app = express();
routes(app);
db();
appConfig();
validation();
prod(app);

const devDebug = debug("app:dev");
devDebug("Dev is started");

let server;

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;
  server = app.listen(port, () => logger.info(`Listening on port ${port}...`));
}

export default server;
