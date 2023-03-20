import express, { Express } from "express";

import error from "../middleware/error";
import auth from "../routes/auth";
import customers from "../routes/customers";
import genres from "../routes/genres";
import movies from "../routes/movies";
import rentals from "../routes/rentals";
import returns from "../routes/returns";
import users from "../routes/users";

export const routes = (app: Express) => {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/returns", returns);
  app.use(error);
};
