// Temporary in-memory "database"
let medicinesDB = [];   // You can replace this later with real DB logic
let nextId = 1;

class Medicine {
  constructor(id, name, category, price, stock) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.stock = stock;
  }

  // ---------------------------
  // Add a new medicine
  // ---------------------------
  addMedicine() {
    this.id = nextId++;
    medicinesDB.push(this);
    return this;
  }

  // ---------------------------
  // Update stock for medicine
  // ---------------------------
  updateStock(newStock) {
    this.stock = newStock;

    const index = medicinesDB.findIndex(m => m.id === this.id);
    if (index !== -1) {
      medicinesDB[index].stock = newStock;
    }

    return this;
  }

  // ---------------------------
  // Delete a medicine
  // ---------------------------
  deleteMedicine() {
    medicinesDB = medicinesDB.filter(m => m.id !== this.id);
    return true;
  }

  // ---------------------------
  // STATIC METHODS (for controllers)
  // ---------------------------

  static findAll() {
    return medicinesDB;
  }

  static findById(id) {
    return medicinesDB.find(m => m.id === parseInt(id));
  }

  static update(id, updatedData) {
    const med = medicinesDB.find(m => m.id === parseInt(id));
    if (!med) return null;

    med.name = updatedData.name || med.name;
    med.category = updatedData.category || med.category;
    med.price = updatedData.price || med.price;
    med.stock = updatedData.stock || med.stock;

    return med;
  }

  static delete(id) {
    const beforeCount = medicinesDB.length;
    medicinesDB = medicinesDB.filter(m => m.id !== parseInt(id));
    return medicinesDB.length < beforeCount;
  }
}

module.exports = Medicine;
