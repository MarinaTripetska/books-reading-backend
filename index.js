const mongoose = require("mongoose");
const app = require("./app");
const { envHelper } = require("./helpers");
const https = require("https");
const fs = require("fs");

const privateKey = fs.readFileSync("./rsclone.com/privkey.pem", "utf8");
const certificate = fs.readFileSync("./rsclone.com/fullchain.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

mongoose.set("strictQuery", true);

mongoose.set("strictQuery", true);

mongoose
  .connect(envHelper.DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .then(() => {
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(envHelper.PORT, () => {
      console.log(`HTTPS Server running on port ${envHelper.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`ERROR: ${error.message}`);
    process.exit(1);
  });
