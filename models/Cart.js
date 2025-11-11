class Cart {
  constructor(userId, items = []) {
    this.userId = userId;
    this.items = items; // Array of { medicineId, quantity }
  }

  addToCart(medicineId, quantity) {
    //add item to cart
  }

  removeFromCart(medicineId) {
    //remove item from cart
  }

  clearCart() {
    //clear all items
  }
}

module.exports = Cart;
