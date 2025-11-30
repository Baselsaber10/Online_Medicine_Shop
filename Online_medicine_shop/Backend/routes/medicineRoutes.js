const express = require("express");
const router = express.Router();
const MedicineController = require("../controllers/MedicineController");

// Get all medicines
router.get("/", MedicineController.getAllMedicines);

// Get single medicine
router.get("/:id", MedicineController.getMedicineById);

// Add new medicine (Admin)
router.post("/", MedicineController.addMedicine);

// Update medicine (Admin)
router.put("/:id", MedicineController.updateMedicine);

// Delete medicine (Admin)
router.delete("/:id", MedicineController.deleteMedicine);

module.exports = router;
