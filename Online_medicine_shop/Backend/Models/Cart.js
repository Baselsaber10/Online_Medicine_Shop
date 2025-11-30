const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
      quantity: Number,
    },
  ],
});

const CartModel = mongoose.model("Cart", CartSchema);

class Cart {
  constructor(userId, items = []) {
    this.userId = userId;
    this.items = items;
  }

  async addToCart(medicineId, quantity) {
    const cart = await CartModel.findOne({ userId: this.userId });

    if (!cart) {
      return await CartModel.create({
        userId: this.userId,
        items: [{ medicineId, quantity }],
      });
    }

    const existing = cart.items.find(i => i.medicineId == medicineId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ medicineId, quantity });
    }

    return await cart.save();
  }

  async removeFromCart(medicineId) {
    const cart = await CartModel.findOne({ userId: this.userId });
    cart.items = cart.items.filter(i => i.medicineId != medicineId);
    return await cart.save();
  }

  async clearCart() {
    const cart = await CartModel.findOne({ userId: this.userId });
    cart.items = [];
    return await cart.save();
  }

  // STATIC METHODS
  static async findCartByUserId(userId) {
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = await CartModel.create({ userId, items: [] });
    }

    return cart;
  }

  static async addItem(userId, medicineId, quantity) {
    const cart = new Cart(userId);
    return await cart.addToCart(medicineId, quantity);
  }

  static async removeItem(userId, medicineId) {
    const cart = new Cart(userId);
    return await cart.removeFromCart(medicineId);
  }

  static async clear(userId) {
    const cart = new Cart(userId);
    return await cart.clearCart();
  }
}

module.exports = Cart;
