const db = require("../database/db");

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
  static createUser(data) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO users (name, email, password, address, phone)
      VALUES (?, ?, ?, ?, ?)`;

      db.run(query, [data.name, data.email, data.password, data.address, data.phone],
        function (err) {
          if (err) reject(err);
          resolve({ id: this.lastID, ...data });
        }
      );
    });
  }

  // Get user by email
  static findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  // Get user by id
  static findUserById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
}

module.exports = User;
