import { app } from "@/app";
import request from "supertest";

describe("GET /users", () => {
  it("Should be able to get users", async () => {
    await app.ready();

    await request(app.server)
      .get("/users")
      .set("Accept", "application/json")
      .expect(200);
  });
});
