const Order = require('../models/Order');
const Cart = require('../models/Cart');

class OrderController {
  // Place an order
  static async placeOrder(req, res) {
    // TODO: create order from user's cart, calculate total, save
  }

  // Cancel an order
  static async cancelOrder(req, res) {
    // TODO: change order status to canceled
  }

  // Get orders of a user
  static async getUserOrders(req, res) {
    // TODO: return all orders of a specific user
  }

  // Track order by ID
  static async trackOrder(req, res) {
    // TODO: return order status
  }
}

module.exports = OrderController;
