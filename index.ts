import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 4050;
const mongoUri = process.env.MONGO_URI + "";
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/authApi", require("./routes/auth/authRoutes.ts"));
app.use("/townApi", require("./routes/town/townRoutes.ts"));
app.use("/userApi", require("./routes/user/userRoutes.ts"));

async function start() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(port, () => console.log(`STARTED ${port}`));
  } catch (e) {
    console.log("ERROR MONGO CONNECT", e.message);
  }
}

start();
