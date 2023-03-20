import express, { Express } from "express";

import error from "../middleware/error";
import auth from "../routes/auth";
import users from "../routes/users";

export const routes = (app: Express) => {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
