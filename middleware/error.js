import { logger } from "../startup/logging.js";

export default function (err, req, res) {
  logger.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed.");
}
