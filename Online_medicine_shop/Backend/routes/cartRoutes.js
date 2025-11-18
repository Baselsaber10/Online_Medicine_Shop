const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

// API endpoints
router.post('/add', CartController.addToCart);        // POST /api/cart/add
router.post('/remove', CartController.removeFromCart); // POST /api/cart/remove
router.post('/update', CartController.updateCartItem); // POST /api/cart/update
router.get('/:userId', CartController.getCart);        // GET /api/cart/:userId
router.post('/clear', CartController.clearCart);      // POST /api/cart/clear

module.exports = router;
