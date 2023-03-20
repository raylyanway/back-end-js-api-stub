import { HydratedDocument, Model } from "mongoose";

import { Customer } from "./customer";
import { Movie } from "./movie";

export interface Rental {
  customer: Customer;
  movie: Movie;
  dateOut: Date;
  dateReturned: Date;
  rentalFee: number;
}

export interface RentalMethods {
  back(): void;
}

export interface RentalModel
  extends Model<Rental, Record<string, never>, RentalMethods> {
  lookup(
    customerId: string,
    movieId: string
  ): Promise<HydratedDocument<Rental, RentalMethods>>;
}
