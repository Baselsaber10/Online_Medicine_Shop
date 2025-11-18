const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// API endpoints
router.post('/register', UserController.registerUser);  // POST /api/users/register
router.post('/login', UserController.loginUser);        // POST /api/users/login
router.get('/:id', UserController.getUserProfile);      // GET /api/users/:id

module.exports = router;
