const { bookService } = require("../../services");

const createBook = async (req, res, _) => {
  const { _id } = req.user;

  const result = await bookService.createBook(_id, req.body);

  res.status(201).json({
    status: "Create",
    code: 201,
    data: result,
  });
};

module.exports = createBook;
