import compression from "compression";
import { Express } from "express";
import helmet from "helmet";

export const prod = (app: Express) => {
  app.use(helmet());
  app.use(compression());
};
