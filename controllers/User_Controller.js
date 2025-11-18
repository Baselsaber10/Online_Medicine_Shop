const User = require('../models/User');

class UserController {

  // Register a new user
  static async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;

      // 1. Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // 2. Check if the user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // 3. Create the user and save to DB
      const newUser = new User(name, email, password);
      await newUser.save();

      return res.status(201).json({
        message: "User registered successfully!",
        user: { name, email }
      });

    } catch (error) {
      console.error("Register User Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Login user
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      // 1. Basic validation
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      // 2. Find the user
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // 3. Compare passwords (plain text)
      if (password !== user.password) {
        return res.status(400).json({ error: "Incorrect password" });
      }

      return res.json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email }
      });

    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Get user profile
  static async getUserProfile(req, res) {
    try {
      const userId = req.params.id; // e.g., /profile/:id

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email
      });

    } catch (error) {
      console.error("Get Profile Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = UserController;
