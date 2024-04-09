import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

router.get("/tasks/user/:id", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks/", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
