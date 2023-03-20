import { NextFunction, Request, Response } from "express";

import { User } from "../types/user";

export default (
  req: Request<
    never,
    never,
    {
      user: User;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};
