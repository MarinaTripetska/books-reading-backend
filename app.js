const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();

const msgLogger = app.get("env") === "development" ? "dev" : "prod";

app.use(cors());
app.use(express.json());
app.use(logger(msgLogger));

//
// here custom routes api, for exmpl: app.use("/api/v1/products", productsRouter);
//

app.use((req, res, next) => {
  next({ status: 404, message: "Not found" });
});

//
// here can be custom error hendler midleware, for exmpl: app.use(errorHandler)
//

module.exports = app;
