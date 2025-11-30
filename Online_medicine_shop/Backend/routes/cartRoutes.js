const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");

// Get user's cart
router.get("/:userId", CartController.getCart);

// Add item to cart
router.post("/:userId/add", CartController.addToCart);

// Remove item from cart
router.post("/:userId/remove", CartController.removeFromCart);

// Clear cart
router.delete("/:userId/clear", CartController.clearCart);

module.exports = router;
