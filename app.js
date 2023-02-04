const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const errorHandler = require("./errors/errorHandler");
const { authRouter } = require("./routes/api");

const app = express();
console.log("app.get(env)", app.get("env"));
const msgLogger =
  app.get("env") === "development" ? "development" : "production";

app.use(cors());
app.use(express.json());
app.use(logger(msgLogger));

app.use("/api/v1/users", authRouter);

// if wrong route:
app.use((_, res, next) => {
  next({ status: 404, message: "Not found" });
});

// custom errors and default server error(500):
app.use(errorHandler);

module.exports = app;
