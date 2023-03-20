import { IncomingMessage, Server, ServerResponse } from "http";
import request from "supertest";

import { Genre } from "../../models/genre";
import { User } from "../../models/user";

describe("auth middleware", () => {
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  beforeEach(async () => {
    const appIndex = await import("../../index");
    server = appIndex.server;
  });
  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });

  let token: string;

  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
