const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phone: { type: String }
}, { timestamps: true });

// Create User Model
const UserModel = mongoose.model('User', userSchema);

class User {
  constructor(id, name, email, password, address, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.phone = phone;
  }

  // Create a new user
  static async createUser(data) {
    try {
      const newUser = await UserModel.create({
        name: data.name,
        email: data.email,
        password: data.password,
        address: data.address,
        phone: data.phone
      });
      return { id: newUser._id, ...data };
    } catch (err) {
      throw err;
    }
  }

  // Find a user by email
  static async findUserByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (err) {
      throw err;
    }
  }

  // Find a user by id
  static async findUserById(id) {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = User;
