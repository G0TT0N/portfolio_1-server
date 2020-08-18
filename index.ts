require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = process.env.PORT || 4050;
const cors = require("cors");

const whitelist = [
  "http://localhost:4200",
  "https://g0tt0n.github.io/portfolio_1",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
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
