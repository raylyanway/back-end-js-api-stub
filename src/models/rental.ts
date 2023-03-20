import Joi from "joi";
import moment from "moment";
import mongoose from "mongoose";

import {
  Rental as RentalType,
  RentalMethods,
  RentalModel,
} from "../types/rental";

const rentalSchema = new mongoose.Schema<
  RentalType,
  RentalModel,
  RentalMethods
>(
  {
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
        isGold: {
          type: Boolean,
          default: false,
        },
        phone: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  },
  {
    statics: {
      lookup(customerId, movieId) {
        return this.findOne({
          "customer._id": customerId,
          "movie._id": movieId,
        });
      },
    },
  }
);

rentalSchema.method("back", function back() {
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, "days");
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
});

export const Rental = mongoose.model<RentalType, RentalModel>(
  "Rental",
  rentalSchema
);

export const validate = (rental: RentalType) => {
  const schema = Joi.object({
    customerId: Joi.object().required(),
    movieId: Joi.object().required(),
  });

  return schema.validate(rental);
};
