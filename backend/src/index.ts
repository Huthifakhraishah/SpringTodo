import express from "express";

const app = express();
const port = 3001; // or process.env.PORT

app.get("/", (req, res) => {
  res.send("Hello !");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
