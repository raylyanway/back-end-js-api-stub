import config from "config";
import mongoose from "mongoose";

import { logger } from "./logging";

export const db = () => {
  const db = config.get<string>("db");
  mongoose.connect(db).then(() => logger.info(`Connected to ${db}...`));
};
