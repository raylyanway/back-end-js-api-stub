import { createLogger, transports, format } from "winston";
// require('winston-mongodb');
import("express-async-errors");

export const logger = createLogger({
  transports: [new transports.File({ filename: "combined.log" })],
  exceptionHandlers: [
    new transports.Console({
      format: format.combine(format.colorize(), format.prettyPrint()),
    }),
    // new transports.Console({ colorize: true, prettyPrint: true }),
    new transports.File({ filename: "uncaughtExceptions.log" }),
  ],
});

process.on("unhandledRejection", (ex) => {
  throw ex;
});

// module.exports.run = function () {
// winston.exceptions.handle(
//   new winston.transports.Console({ colorize: true, prettyPrint: true }),
//   new winston.transports.File({ filename: "uncaughtExceptions.log" })
// );

// process.on("unhandledRejection", (ex) => {
//   throw ex;
// });

// winston.add(winston.transports.File, { filename: "logfile.log" });
// winston.add(winston.transports.MongoDB, {
//   db: 'mongodb://localhost/vidly',
//   level: 'info'
// });
// };
