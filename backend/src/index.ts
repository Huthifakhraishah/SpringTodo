import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware";
import checkJwt from "./middleware/auth";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware for parsing JSON request bodies
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/public", (req, res) => {
  res.status(200).send("Public Content");
});

// Applying the Auth0 JWT middleware to secure task-related routes
app.use("/api", checkJwt, taskRoutes);

// Centralized error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
