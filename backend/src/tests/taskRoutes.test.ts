import request from "supertest";
import { app } from "../index";

describe("Task CRUD operations", () => {
  let newTaskId: any;

  it("should create a new task", async () => {
    const response = await request(app).post("/api/tasks").send({
      title: "Test Task",
      description: "Test Description",
      status: "TODO",
      deadline: new Date(),
      userId: 1, // Assume a valid user ID
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    newTaskId = response.body.id;
  });

  it("should get all tasks", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should get a task by id", async () => {
    const response = await request(app).get(`/api/tasks/${newTaskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id", newTaskId);
  });

  it("should update a task", async () => {
    const updatedTask = {
      title: "Updated Test Task",
      description: "Updated Description",
      status: "IN_PROGRESS",
      deadline: new Date(),
    };
    const response = await request(app)
      .put(`/api/tasks/${newTaskId}`)
      .send(updatedTask);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("title", updatedTask.title);
  });

  it("should delete a task", async () => {
    const response = await request(app).delete(`/api/tasks/${newTaskId}`);
    expect(response.statusCode).toBe(204);

    // verify the task is actually deleted
    const getResponse = await request(app).get(`/api/tasks/${newTaskId}`);
    expect(getResponse.statusCode).toBe(404);
  });
});
