require("dotenv").config();

const { PORT = 8081, DB_HOST } = process.env;

module.exports = { PORT, DB_HOST };
