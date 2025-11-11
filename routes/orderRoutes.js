const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// API endpoints
router.post('/place', OrderController.placeOrder);      // POST /api/orders/place
router.post('/cancel', OrderController.cancelOrder);    // POST /api/orders/cancel
router.get('/user/:userId', OrderController.getUserOrders); // GET /api/orders/user/:userId
router.get('/:orderId', OrderController.trackOrder);    // GET /api/orders/:orderId

module.exports = router;
