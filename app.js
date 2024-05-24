const express = require("express");
const cors = require("cors");
const notesRouter = require("./notes");
const port = "3100";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Notes Service! 😁");
});

app.listen(port, () => {
  console.log("Server Connected on PORT: " + port + "/");
});