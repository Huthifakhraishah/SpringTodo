import request from "supertest";
import { app } from "../index";

describe("GET /api/tasks", () => {
  it("should fetch all tasks", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.statusCode).toBe(200);
  });
});
