import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import indexRouter from "./routes/index.js";
import errorRouter from "./routes/errorRouter.js";
import apiRouter from "./routes/api.js";
import usersRouter from "./routes/users.js";
import newebPay from "./routes/newebpay.js";
import ecPay from "./routes/ecpay.js";
import FireBase from './routes/firebase.js';
import GithubOAuth from './routes/github-oauth.js';
import GoogleOAuth from './routes/googleOAuth.js';
import LineOAuth from './routes/lineOAuth.js';

import { readFile } from "fs/promises";
const swaggerDocument = JSON.parse(
  await readFile(new URL("./swagger-output.json", import.meta.url))
);

const app = express();

import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/error", errorRouter);
app.use("/api", apiRouter);
app.use("/users", usersRouter);
app.use("/webPay", newebPay);
app.use("/ecPay", ecPay);
app.use("/firebase", FireBase);
app.use("/githubOAuth", GithubOAuth);
app.use("/googleOAuth", GoogleOAuth);
app.use("/lineOAuth", LineOAuth);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// export default app;
export default app;
