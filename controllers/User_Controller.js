const User = require('../models/User');

class UserController {
  // Register a new user
  static async registerUser(req, res) {
    // use User model to create new user and save to DB
    // Example: check if email exists, then save
  }

  // Login user
  static async loginUser(req, res) {
    // use User model to verify credentials
    // Example: email + password
  }

  // Get user profile
  static async getUserProfile(req, res) {
    //fetch user by ID and return profile info
  }
}

module.exports = UserController;
