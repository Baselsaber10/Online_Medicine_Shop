const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

// Place an order
router.post("/:userId/place", OrderController.placeOrder);

// Get user's orders
router.get("/:userId", OrderController.getUserOrders);

// Update order status (Admin)
router.put("/:id/status", OrderController.updateOrderStatus);

module.exports = router;
