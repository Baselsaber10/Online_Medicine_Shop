const CartModel = require("../Models/Cart");
const MedicineModel = require("../Models/Medicine");

class CartController {

  // Get user's cart
  static async getCart(req, res) {
    try {
      const userId = req.params.userId;

      // Find cart by user ID
      const cart = await CartModel.findOne({ userId }).populate("items.medicineId");
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

      // Check if medicine exists
      const medicine = await MedicineModel.findById(medicineId);
      if (!medicine) {
        return res.status(404).json({ error: "Medicine not found" });
      }

      // Find cart or create new one
      let cart = await CartModel.findOne({ userId });
      if (!cart) {
        cart = new CartModel({ userId, items: [] });
      }

      // Check if medicine already in cart
      const itemIndex = cart.items.findIndex(item => item.medicineId.toString() === medicineId);
      if (itemIndex > -1) {
        // Update quantity if exists
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ medicineId, quantity });
      }

      await cart.save();
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

      const cart = await CartModel.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      // Remove item from cart
      cart.items = cart.items.filter(item => item.medicineId.toString() !== medicineId);
      await cart.save();

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

      const cart = await CartModel.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }

      // Clear all items
      cart.items = [];
      await cart.save();

      return res.json({ message: "Cart cleared" });

    } catch (err) {
      console.error("Clear Cart Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = CartController;
