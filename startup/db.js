import config from "config";
import mongoose from "mongoose";

import { logger } from "../startup/logging.js";

export const db = () => {
  const db = config.get("db");
  mongoose
    .connect(db, { useUnifiedTopology: true })
    .then(() => logger.info(`Connected to ${db}...`));
};
