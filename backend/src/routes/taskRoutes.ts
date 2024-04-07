import { Router } from "express";

const router = Router();

router.get("/tasks", (req, res) => {
  res.json({ message: "Retrieve all tasks" });
});

export default router;
