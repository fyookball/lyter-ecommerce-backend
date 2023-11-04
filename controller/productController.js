const Products = require("../model-database/models/products");
const ErrorResponse = require("../utils/errorResponse");

exports.getProducts = async (req, res, next) => {
  let filter = {};
  if (req.query) {
    filter = req.query;
  }

  try {
    const products = await Product.findAll({
      where: filter,
    });

    if (!products || products.length === 0)
      return next(new ErrorResponse("No product available", 201));

    res.status(200).json({ status: true, products: products });
  } catch (error) {
    next(error);
  }
};

exports.boughtProduct = async (req, res) => {
  try {
  } catch (error) {}
};
