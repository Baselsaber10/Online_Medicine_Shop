const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  phone: String,
});

const UserModel = mongoose.model("User", UserSchema);

class User {
  constructor(id, name, email, password, address, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.phone = phone;
  }

  // Create user
  static async createUser(data) {
    const user = await UserModel.create(data);
    return user;
  }

  // Get user by email
  static async findUserByEmail(email) {
    return await UserModel.findOne({ email });
  }

  // Get user by id
  static async findUserById(id) {
    return await UserModel.findById(id);
  }
}

module.exports = User;
