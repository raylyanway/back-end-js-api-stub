import compression from "compression";
import helmet from "helmet";

export const prod = (app) => {
  app.use(helmet());
  app.use(compression());
};
