import express from "express";
import taskRoutes from "./routes/taskRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

const app = express();
const port = 3001;

app.use(express.json());
app.use("/api", taskRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
