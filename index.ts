require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 4050;
const cors = require("cors");

app.use(cors());
app.use(express.json({extended: true}));

app.use("/auth", require("./routes/auth/auth-routes"));

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(port, () => console.log(`STARTED ${port}`));
  } catch (e) {
    console.log("server error", e.message);
    process.exit(1);
  }
}

start();
