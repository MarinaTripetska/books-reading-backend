const validation = (schema) => {
  return (req, res, next) => {
    const { error } =
      Object.keys(req.query).length !== 0
        ? schema.validate(req.query)
        : schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    }
    next();
  };
};

module.exports = validation;
