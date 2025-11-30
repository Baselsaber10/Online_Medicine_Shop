const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User_Controller");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const user = await UserController.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login / Find user by email
router.post("/login", async (req, res) => {
  try {
    const user = await UserController.findUserByEmail(req.body.email);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await UserController.findUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
