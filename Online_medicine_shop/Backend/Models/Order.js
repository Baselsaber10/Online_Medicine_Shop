// Models/Order.js  (MongoDB / Mongoose version)
const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

class Order {
  // Keep constructor signature similar to the old code.
  // Note: orderId will be the Mongo _id once saved.
  constructor(orderId, userId, items, total, status = "Pending") {
    this.orderId = orderId; // before saving: may be undefined; after save: contains Mongo _id
    this.userId = userId;
    this.items = items;
    this.total = total;
    this.status = status;
  }

  // Place a new order (saves to Mongo)
  async placeOrder() {
    const doc = await OrderModel.create({
      userId: this.userId,
      items: this.items,
      total: this.total,
      status: this.status,
    });

    // update this.orderId to reflect saved _id (string form)
    this.orderId = doc._id.toString();
    return doc;
  }

  // Cancel an order (updates status to "Cancelled")
  async cancelOrder() {
    // if this.orderId is not set, nothing to cancel locally
    if (!this.orderId) {
      throw new Error("orderId is required to cancel an order");
    }

    const updated = await OrderModel.findByIdAndUpdate(
      this.orderId,
      { status: "Cancelled" },
      { new: true }
    );

    // keep in-memory instance synced
    if (updated) {
      this.status = updated.status;
    }

    return updated;
  }

  // Track order status
  async trackOrder() {
    if (!this.orderId) {
      throw new Error("orderId is required to track an order");
    }
    const order = await OrderModel.findById(this.orderId).select("status");
    return order ? order.status : null;
  }

  // ---------------------------
  // STATIC METHODS (for controllers)
  // ---------------------------

  // Find by id (accepts Mongo ObjectId string)
  static async findById(orderId) {
    // If orderId looks like a number string and your previous code expects numbers,
    // this will still work only if you changed controllers to pass ObjectId strings.
    return await OrderModel.findById(orderId);
  }

  // Find all orders for a given userId
  static async findByUserId(userId) {
    return await OrderModel.find({ userId });
  }

  // Update status of an order
  static async updateStatus(orderId, newStatus) {
    const allowed = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!allowed.includes(newStatus)) {
      throw new Error("Invalid status");
    }

    return await OrderModel.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true }
    );
  }
}

module.exports = Order;
