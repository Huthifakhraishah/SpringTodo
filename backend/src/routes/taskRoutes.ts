import { Router } from "express";
import checkJwt from "../middleware/auth";

const router = Router();

router.get("/tasks", checkJwt, (req, res) => {
  res.json({ message: "Retrieve all tasks" });
});

router.post("/tasks", checkJwt, (req, res) => {
  // Logic to create a task
});

router.get("/tasks/:id", checkJwt, (req, res) => {
  // Logic to get a specific task by id
});

export default router;
