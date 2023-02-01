const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const errorHandler = require("./errors/errorHandler");
const { authRouter } = require("./routes/api");

const app = express();

const msgLogger = app.get("env") === "development" ? "dev" : "prod";

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
