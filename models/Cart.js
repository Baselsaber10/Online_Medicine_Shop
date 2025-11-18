// Temporary in-memory database for carts
let cartDB = []; // Each cart: { userId, items: [ { medicineId, quantity } ] }

class Cart {
  constructor(userId, items = []) {
    this.userId = userId;
    this.items = items; // Array of { medicineId, quantity }
  }

  // ---------------------------
  // Add item to user's cart
  // ---------------------------
  addToCart(medicineId, quantity) {
    const existingItem = this.items.find(
      (item) => item.medicineId === medicineId
    );

    if (existingItem) {
      existingItem.quantity += quantity; // Increase quantity
    } else {
      this.items.push({ medicineId, quantity });
    }

    Cart._saveCart(this);
    return this;
  }

  // ---------------------------
  // Remove item from cart
  // ---------------------------
  removeFromCart(medicineId) {
    this.items = this.items.filter(
      (item) => item.medicineId !== medicineId
    );

    Cart._saveCart(this);
    return this;
  }

  // ---------------------------
  // Clear entire cart
  // ---------------------------
  clearCart() {
    this.items = [];
    Cart._saveCart(this);
    return this;
  }

  // ========================================
  // STATIC METHODS (used by controllers)
  // ========================================

  static findCartByUserId(userId) {
    let cart = cartDB.find((c) => c.userId === userId);

    if (!cart) {
      // If cart doesn't exist, create a new empty one
      cart = new Cart(userId, []);
      cartDB.push(cart);
    }

    return cart;
  }

  static addItem(userId, medicineId, quantity) {
    const cart = Cart.findCartByUserId(userId);
    return cart.addToCart(medicineId, quantity);
  }

  static removeItem(userId, medicineId) {
    const cart = Cart.findCartByUserId(userId);
    return cart.removeFromCart(medicineId);
  }

  static clear(userId) {
    const cart = Cart.findCartByUserId(userId);
    return cart.clearCart();
  }

  // Save or update cart in cartDB
  static _saveCart(cart) {
    const index = cartDB.findIndex((c) => c.userId === cart.userId);

    if (index === -1) {
      cartDB.push(cart);
    } else {
      cartDB[index] = cart;
    }
  }
}

module.exports = Cart;
