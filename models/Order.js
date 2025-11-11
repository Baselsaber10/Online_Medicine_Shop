class Order {
  constructor(orderId, userId, items, total, status = "Pending") {
    this.orderId = orderId;
    this.userId = userId;
    this.items = items; // Array of medicines
    this.total = total;
    this.status = status;
  }

  placeOrder() {
    //create new order
  }

  cancelOrder() {
    //cancel an existing order
  }

  trackOrder() {
    //track order status
  }
}

module.exports = Order;
