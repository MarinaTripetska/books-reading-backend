const mongoose = require("mongoose");
const app = require("./app");
const { envHelper } = require("./helpers");

mongoose
  .connect(envHelper.DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .then(() => {
    app.listen(envHelper.PORT);
    console.log(`Server running. Use our API on port: ${envHelper.PORT}`);
  })
  .catch((error) => {
    console.log(`ERROR: ${error.message}`);
    process.exit(1);
  });
