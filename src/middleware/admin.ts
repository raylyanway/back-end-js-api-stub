import { NextFunction,Request, Response } from "express";

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
  // 401 Unauthorized
  // 403 Forbidden

  if (!req.body.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};
