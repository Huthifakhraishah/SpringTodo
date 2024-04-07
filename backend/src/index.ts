import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware";
import checkJwt from "./middleware/auth";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/public", (req, res) => {
  res.status(200).send("Public Content");
});

app.use("/api", checkJwt, taskRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
