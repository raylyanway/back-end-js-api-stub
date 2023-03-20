import { IncomingMessage, Server, ServerResponse } from "http";
import request from "supertest";

import { User } from "../../models/user";

describe("auth middleware", () => {
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  beforeEach(async () => {
    const appIndex = await import("../../index");
    server = appIndex.server;
  });
  afterEach(async () => {
    await server.close();
  });

  let token: string;

  const exec = () => {
    return request(server)
      .get("/api/users/me")
      .set("x-auth-token", token)
      .send({ _id: "6417a40e492b34edf3564520" });
  };

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
    token = new User().generateAuthToken();

    const res = await exec();

    expect(res.status).toBe(200);
  });
});
