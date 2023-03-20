import { createLogger, format, transports } from "winston";

import "winston-mongodb";
import "express-async-errors";

export const logger = createLogger({
  transports: [
    new transports.File({ filename: "combined.log" }),
    new transports.MongoDB({
      db: "mongodb://localhost/example",
      level: "info",
    }),
  ],
  exceptionHandlers: [
    new transports.Console({
      format: format.combine(format.colorize(), format.prettyPrint()),
    }),
    new transports.File({ filename: "uncaughtExceptions.log" }),
  ],
});

process.on("unhandledRejection", (ex) => {
  throw ex;
});
