import { Request, Response } from "express";

// import { logger } from "../bootstrap/logging";

export default function (req: Request, res: Response) {
  res.status(500).send("Something failed.");
}
