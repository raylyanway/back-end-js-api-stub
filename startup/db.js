import { logger } from "../startup/logging.js";
import mongoose from "mongoose";
import config from "config";

export const db = () => {
  const db = config.get("db");
  mongoose
    .connect(db, { useUnifiedTopology: true })
    .then(() => logger.info(`Connected to ${db}...`));
};
