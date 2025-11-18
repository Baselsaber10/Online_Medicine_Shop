const Order = require("../models/Order");
const Cart = require("../models/Cart");

class OrderController {

  // Place an order
  static async placeOrder(req, res) {
    try {
      const userId = req.params.userId;

      // 1. Get user's cart
      const cart = await Cart.findCartByUserId(userId);
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // 2. Create order
      const newOrder = new Order(
        userId,
        cart.items,
        cart.totalPrice,
        "Processing"
      );

      await newOrder.save();

      // 3. Clear cart after placing order
      await Cart.clear(userId);

      return res.json({ message: "Order placed", order: newOrder });

    } catch (err) {
      console.error("Place Order Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Get user's orders
  static async getUserOrders(req, res) {
    try {
      const userId = req.params.userId;

      const orders = await Order.findByUserId(userId);
      return res.json(orders);

    } catch (err) {
      console.error("Get User Orders Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Update order status (Admin)
  static async updateOrderStatus(req, res) {
    try {
      const orderId = req.params.id;
      const { status } = req.body;

      const updatedOrder = await Order.updateStatus(orderId, status);
      return res.json({ message: "Order status updated", updatedOrder });

    } catch (err) {
      console.error("Update Order Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = OrderController;
