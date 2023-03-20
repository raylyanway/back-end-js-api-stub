import { Request, Response } from "express";
import mongoose from "mongoose";

import auth from "../../../middleware/auth";
import { User } from "../../../models/user";

describe("auth middleware", () => {
  it("should populate req.user with the payload of a valid JWT", () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toString(),
      isAdmin: true,
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
      body: {},
    } as unknown as Request;
    const res = {} as unknown as Response;
    const next = jest.fn();

    auth(req, res, next);

    expect(req.body.user).toMatchObject(user);
  });
});
