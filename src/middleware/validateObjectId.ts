import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

export default (req: Request, res: Response, next: NextFunction) => {
  if (!isValidObjectId(req.params.id))
    return res.status(404).send("Invalid ID.");

  next();
};
