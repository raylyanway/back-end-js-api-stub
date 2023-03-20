import express, { Request, Response } from "express";
import Joi from "joi";

import auth from "../middleware/auth";
import validate from "../middleware/validate";
import { Movie } from "../models/movie";
import { Rental } from "../models/rental";

const router = express.Router();

router.post(
  "/",
  [auth, validate(validateReturn)],
  async (req: Request, res: Response) => {
    const requestedRental = await Rental.lookup(
      req.body.customerId,
      req.body.movieId
    );

    if (!requestedRental) return res.status(404).send("Rental not found.");

    if (requestedRental.dateReturned)
      return res.status(400).send("Return already processed.");

    const rental = new Rental(requestedRental);

    rental.back();
    rental.markModified;
    await rental.save();

    await Movie.updateOne(
      { _id: req.body.movieId },
      {
        $inc: { numberInStock: 1 },
      }
    );

    return res.send(rental);
  }
);

function validateReturn(req: Request) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
    user: Joi.object().required(),
  });

  return schema.validate(req);
}

export default router;
