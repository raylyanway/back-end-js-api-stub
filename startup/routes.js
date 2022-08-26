import express from "express";
import genres from "../routes/genres.js";
// import { customers } from "../routes/customers";
// import { movies } from "../routes/movies";
// import { rentals } from "../routes/rentals";
// import { users } from "../routes/users";
// import { auth } from "../routes/auth";
// import { returns } from "../routes/returns";
// import { error } from "../middleware/error";

export const routes = (app) => {
  app.use(express.json());
  app.use("/api/genres", genres);
  // app.use("/api/customers", customers);
  // app.use("/api/movies", movies);
  // app.use("/api/rentals", rentals);
  // app.use("/api/users", users);
  // app.use("/api/auth", auth);
  // app.use("/api/returns", returns);
  // app.use(error);
};
