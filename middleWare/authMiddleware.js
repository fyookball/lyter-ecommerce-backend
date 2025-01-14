require("dotenv").config();
const jwt = require("jsonwebtoken");
const Customer = require("../model-database/models/customers");
const ErrorResponse = require("../utils/errorResponse");

const requireCustomerAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if the header exists and has the Bearer token format
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token part (remove 'Bearer ' from the header)
    const token = authHeader.split(" ")[1];

    if (!token) return next(new ErrorResponse("No token available", 401));

    jwt.verify(token, process.env.Secret, async (err, decodedToken) => {
      if (err) return next(new ErrorResponse("Invalid token", 401));

      let customer = await Customer.findById(decodedToken.id);
      if (!customer) return next(new ErrorResponse("User not found", 401));

      req.customer = customer;
      next();
    });
  }
};

const requireRetailerAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if the header exists and has the Bearer token format
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token part (remove 'Bearer ' from the header)
    const token = authHeader.split(" ")[1];

    if (!token) return next(new ErrorResponse("No token available", 401));

    jwt.verify(token, process.env.Secret, async (err, decodedToken) => {
      if (err) return next(new ErrorResponse("Invalid token", 401));

      let retailer = await Retailer.findById(decodedToken.id);
      if (!retailer) return next(new ErrorResponse("User not found", 401));

      req.retailer = retailer;
      next();
    });
  }
};

module.exports = { requireCustomerAuth, requireRetailerAuth };
