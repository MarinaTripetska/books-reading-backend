require("dotenv").config();

const { PORT = 8081, DB_HOST, SECRET_KEY } = process.env;

module.exports = { PORT, DB_HOST, SECRET_KEY };
