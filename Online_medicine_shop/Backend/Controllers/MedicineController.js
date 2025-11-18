const Medicine = require("../models/Medicine");

class MedicineController {
  
  // Get all medicines
  static async getAllMedicines(req, res) {
    try {
      const medicines = await Medicine.findAll();
      return res.json(medicines);
    } catch (err) {
      console.error("Get Medicines Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Get single medicine
  static async getMedicineById(req, res) {
    try {
      const medicineId = req.params.id;

      const medicine = await Medicine.findById(medicineId);
      if (!medicine) {
        return res.status(404).json({ error: "Medicine not found" });
      }

      return res.json(medicine);
    } catch (err) {
      console.error("Get Medicine Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Add new medicine (Admin)
  static async addMedicine(req, res) {
    try {
      const { name, description, price, stock } = req.body;

      if (!name || !price || !stock) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newMedicine = new Medicine(name, description, price, stock);
      await newMedicine.save();

      return res.status(201).json({ message: "Medicine added", medicine: newMedicine });

    } catch (err) {
      console.error("Add Medicine Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Update medicine
  static async updateMedicine(req, res) {
    try {
      const medicineId = req.params.id;
      const updatedData = req.body;

      const updatedMedicine = await Medicine.update(medicineId, updatedData);

      return res.json({ message: "Medicine updated", updatedMedicine });

    } catch (err) {
      console.error("Update Medicine Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  // Delete medicine
  static async deleteMedicine(req, res) {
    try {
      const medicineId = req.params.id;

      await Medicine.delete(medicineId);
      return res.json({ message: "Medicine removed" });

    } catch (err) {
      console.error("Delete Medicine Error:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = MedicineController;
