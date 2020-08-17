require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4050;
const cors = require("cors");

app.use(cors());
app.use(express.json({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
