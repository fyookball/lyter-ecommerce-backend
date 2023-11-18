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

 
exports.addProduct = async (req, res, next) => {
  try {  
    const productData = req.body; 
    const product = await Products.create(productData);
    console.log("After creating product:", product);
    res.status(201).json({ status: true, product: product });
  } catch (error) {
    console.error("Error adding product:", error); 
    next(error);
  }
};


exports.boughtProduct = async (req, res) => {
  try {
  } catch (error) {}
};
