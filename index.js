import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import configurePassport from "./passport-config.js";
import bikes from "./routes/bikes.js";
import auth from "./routes/auth.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bike-simulator";
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const SECRET = process.env.SECRET || "secret";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: `https://localhost:${PORT}`,
    methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use("/uploads", express.static("uploads"));
app.use("/bikes", bikes);
app.use("/auth", auth);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
