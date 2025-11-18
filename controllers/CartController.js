const Cart = require("../models/Cart");
const Medicine = require("../models/Medicine");

class CartController {

  // Get user's cart
  static async getCart(req, res) {
    try {
      const userId = req.params.userId;

      const cart = await Cart.findCartByUserId(userId);
      return res.json(cart);

    } catch (err) {
      console.error("Get Cart Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Add item to cart
  static async addToCart(req, res) {
    try {
      const userId = req.params.userId;
      const { medicineId, quantity } = req.body;

      // Check medicine exists
      const medicine = await Medicine.findById(medicineId);
      if (!medicine) {
        return res.status(404).json({ error: "Medicine not found" });
      }

      await Cart.addItem(userId, medicineId, quantity);
      return res.json({ message: "Item added to cart" });

    } catch (err) {
      console.error("Add to Cart Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Remove item from cart
  static async removeFromCart(req, res) {
    try {
      const userId = req.params.userId;
      const { medicineId } = req.body;

      await Cart.removeItem(userId, medicineId);
      return res.json({ message: "Item removed from cart" });

    } catch (err) {
      console.error("Remove Cart Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Clear cart
  static async clearCart(req, res) {
    try {
      const userId = req.params.userId;

      await Cart.clear(userId);
      return res.json({ message: "Cart cleared" });

    } catch (err) {
      console.error("Clear Cart Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = CartController;
