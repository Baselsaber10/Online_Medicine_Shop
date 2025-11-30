const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number,
});

const MedicineModel = mongoose.model("Medicine", MedicineSchema);

class Medicine {
  constructor(id, name, category, price, stock) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.stock = stock;
  }

  // Add a new medicine
  async addMedicine() {
    const med = await MedicineModel.create({
      name: this.name,
      category: this.category,
      price: this.price,
      stock: this.stock,
    });
    return med;
  }

  // Update stock
  async updateStock(newStock) {
    return await MedicineModel.findByIdAndUpdate(
      this.id,
      { stock: newStock },
      { new: true }
    );
  }

  // Delete
  async deleteMedicine() {
    return await MedicineModel.findByIdAndDelete(this.id);
  }

  // STATIC
  static async findAll() {
    return await MedicineModel.find();
  }

  static async findById(id) {
    return await MedicineModel.findById(id);
  }

  static async update(id, updatedData) {
    return await MedicineModel.findByIdAndUpdate(id, updatedData, { new: true });
  }

  static async delete(id) {
    return await MedicineModel.findByIdAndDelete(id);
  }
}

module.exports = Medicine;
