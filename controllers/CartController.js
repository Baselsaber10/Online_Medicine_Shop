const Cart = require('../models/Cart');
const Medicine = require('../models/Medicine');

class CartController {
  // Add item to cart
  static async addToCart(req, res) {
    // TODO: add medicineId + quantity to user's cart
  }

  // Remove item from cart
  static async removeFromCart(req, res) {
    // TODO: remove medicine from cart
  }

  // Update quantity
  static async updateCartItem(req, res) {
    // TODO: change quantity of a specific item
  }

  // Get cart items for a user
  static async getCart(req, res) {
    // TODO: return user's cart items
  }

  // Clear cart
  static async clearCart(req, res) {
    // TODO: remove all items from cart
  }
}

module.exports = CartController;
