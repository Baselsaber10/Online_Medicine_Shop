const OrderModel = require("../models/Order");
const CartModel = require("../Models/Cart");

class OrderController {

  // Place an order
  static async placeOrder(req, res) {
    try {
      const userId = req.params.userId;

      // 1. Get user's cart
      const cart = await CartModel.findOne({ userId }).populate("items.medicineId");
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // 2. Create order
      const newOrder = new OrderModel({
        userId,
        items: cart.items,
        totalPrice: cart.items.reduce((acc, item) => acc + item.medicineId.price * item.quantity, 0),
        status: "Processing"
      });

      await newOrder.save();

      // 3. Clear cart after placing order
      cart.items = [];
      await cart.save();

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

      // Find all orders by user
      const orders = await OrderModel.find({ userId }).populate("items.medicineId");
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

      // Update order status
      const updatedOrder = await OrderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );

      return res.json({ message: "Order status updated", updatedOrder });

    } catch (err) {
      console.error("Update Order Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = OrderController;
