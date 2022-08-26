// const winston = require("winston");
import express from "express";
import debug from "debug";
import { logger } from "./startup/logging.js";
import { routes } from "./startup/routes.js";

const app = express();
routes(app);

// require("./startup/db")();
// require("./startup/config")();
// require("./startup/validation")();
// require("./startup/prod")(app);

const devDebug = debug("app:dev");
// app.get("/:id", (req, res) => {
//   res.send(req.query);
// });

devDebug("Dev is started");
let server;

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;
  // app.listen(port, () => console.info(`Listening on port ${port}...`));
  server = app.listen(port, () => logger.info(`Listening on port ${port}...`));
}

export default server;
