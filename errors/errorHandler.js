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

  if (err.message === "Not authorized") {
    error = new ErrorResponse(err.message, 401);
  }

  if (err.message === "Book already exists") {
    error = new ErrorResponse(err.message, 409);
  }

  if (err.message === "Status is not correct") {
    error = new ErrorResponse(err.message, 400);
  }

  if (err.message === "This user hasn't book's with such ids") {
    error = new ErrorResponse(err.message, 400);
  }

  if (
    err.message === "Book with that id doesn't exist" ||
    err.name === "CastError"
  ) {
    const msg = "Book with that id doesn't exist";
    error = new ErrorResponse(msg, 409);
  }

  if (err.message === "Not found") {
    error = new ErrorResponse(err.message, 404);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired";
    error = new ErrorResponse(message, 401);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    error = new ErrorResponse(message, 401);
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
