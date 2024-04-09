import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware";
import checkJwt from "./middleware/auth";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/public", (req, res) => {
  res.status(200).send("Public Content");
});

app.use("/api", checkJwt, taskRoutes);
app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export { app };
