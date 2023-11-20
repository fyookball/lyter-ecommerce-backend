const CustomerOrders = require("../model-database/models/customer_orders");
const OrderDetails = require("../model-database/models/order_details");
const ErrorResponse = require("../utils/errorResponse");

exports.addOrder = async (req, res, next) => {
  try {
    // Extract order data from request
    const { orderData, orderItems } = req.body; 
    
    // Create main order
    const order = await CustomerOrders.create(orderData);

    // Add order details/items
    for (const item of orderItems) {
      await OrderDetails.create({
        orderId: order.id,
        productId: item.productId,
        price: item.price
      });
    }

    res.status(201).json({ status: true, order: order, orderItems: orderItems });
  } catch (error) {
    console.error("Error adding order:", error);
    next(new ErrorResponse("Error adding order", 500));
  }
};

