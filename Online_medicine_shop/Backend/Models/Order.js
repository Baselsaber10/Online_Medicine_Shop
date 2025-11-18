// Temporary in-memory "database" for orders
let ordersDB = [];
let nextOrderId = 1;

class Order {
  constructor(orderId, userId, items, total, status = "Pending") {
    this.orderId = orderId || nextOrderId++;
    this.userId = userId;
    this.items = items; // Array of { medicineId, quantity, price }
    this.total = total;
    this.status = status; // Pending, Processing, Shipped, Delivered, Cancelled
  }

  // ---------------------------
  // Place a new order
  // ---------------------------
  placeOrder() {
    ordersDB.push(this);
    return this;
  }

  // ---------------------------
  // Cancel an order
  // ---------------------------
  cancelOrder() {
    this.status = "Cancelled";

    const index = ordersDB.findIndex(o => o.orderId === this.orderId);
    if (index !== -1) {
      ordersDB[index].status = "Cancelled";
    }

    return this;
  }

  // ---------------------------
  // Track order status
  // ---------------------------
  trackOrder() {
    return this.status;
  }

  // ---------------------------
  // STATIC METHODS (for controllers)
  // ---------------------------
  static findById(orderId) {
    return ordersDB.find(o => o.orderId === parseInt(orderId));
  }

  static findByUserId(userId) {
    return ordersDB.filter(o => o.userId === userId);
  }

  static updateStatus(orderId, newStatus) {
    const order = Order.findById(orderId);
    if (!order) return null;

    order.status = newStatus;
    return order;
  }
}

module.exports = Order;
