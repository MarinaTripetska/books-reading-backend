class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  console.log("Error name: ", err.name);
  console.log("Error code: ", err.code);
  console.log("Error message: ", err.message);

  if (err.message === "Email in use") {
    error = new ErrorResponse(err.message, 409);
  }

  if (err.message === "Email or password is wrong") {
    error = new ErrorResponse(err.message, 401);
  }

  if (err.name === "SyntaxError") {
    error = new ErrorResponse(err.message, 400);
  }

  if (err.name === "ValidationError") {
    error = new ErrorResponse(err.message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
