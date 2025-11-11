const Medicine = require('../models/Medicine');

class MedicineController {
  // Get all medicines
  static async getAllMedicines(req, res) {
    // TODO: fetch all medicines from DB
  }

  // Get a medicine by ID
  static async getMedicineById(req, res) {
    // TODO: find medicine by ID
  }

  // Add new medicine
  static async addMedicine(req, res) {
    // TODO: create new Medicine instance and save
  }

  // Update medicine
  static async updateMedicine(req, res) {
    // TODO: update existing medicine fields
  }

  // Search medicines
  static async searchMedicines(req, res) {
    // TODO: search by name or category
  }
}

module.exports = MedicineController;
