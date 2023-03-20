import { IncomingMessage, Server, ServerResponse } from "http";
import moment from "moment";
import { Document, Types } from "mongoose";
import request from "supertest";

import { Movie } from "../../models/movie";
import { Rental } from "../../models/rental";
import { User } from "../../models/user";
import { Movie as MovieType } from "../../types/movie";
import { Rental as RentalType } from "../../types/rental";

describe("/api/returns", () => {
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;
  let customerId: Types.ObjectId | string;
  let movieId: Types.ObjectId | string;
  let rental: Document<unknown, unknown, RentalType>;
  let movie: Document<unknown, unknown, MovieType>;
  let token: string;

  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    const appIndex = await import("../../index");
    server = appIndex.server;

    customerId = new Types.ObjectId();
    movieId = new Types.ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie({
      _id: movieId,
      title: "12345",
      dailyRentalRate: 2,
      genre: { name: "12345" },
      numberInStock: 10,
    });
    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "12345",
      },
      movie: {
        _id: movieId,
        title: "12345",
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.deleteMany({});
    await Movie.deleteMany({});
  });

  it("should return 401 if client is not logged in", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if customerId is not provided", async () => {
    customerId = "";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    movieId = "";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 404 if no rental found for the customer/movie", async () => {
    await Rental.deleteMany({});

    const res = await exec();

    expect(res.status).toBe(404);
  });

  it("should return 400 if return is already processed", async () => {
    await rental.updateOne({ dateReturned: new Date() });
    await rental.save();

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if we have a valid request", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });

  it("should set the returnDate if input is valid", async () => {
    await exec();

    const rentalInDb = await Rental.findById(rental._id);
    const diff =
      new Date().getTime() - (rentalInDb?.dateReturned.getTime() ?? 0);
    expect(diff).toBeLessThan(10 * 1000);
  });

  it("should set the rentalFee if input is valid", async () => {
    await rental.updateOne({ dateOut: moment().add(-7, "days").toDate() });
    await rental.save();

    await exec();

    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb?.rentalFee).toBe(14);
  });

  it("should increase the movie stock if input is valid", async () => {
    await exec();

    const movieInDb = await Movie.findById(movieId);
    expect(movieInDb?.numberInStock).toBe(movie.get("numberInStock") + 1);
  });

  it("should return the rental if input is valid", async () => {
    const res = await exec();

    await Rental.findById(rental._id);

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        "dateOut",
        "dateReturned",
        "rentalFee",
        "customer",
        "movie",
      ])
    );
  });
});
