const express = require('express');
const router = express.Router();
const MedicineController = require('../controllers/MedicineController');

// API endpoints
router.get('/', MedicineController.getAllMedicines);       // GET /api/medicines
router.get('/:id', MedicineController.getMedicineById);    // GET /api/medicines/:id
router.post('/', MedicineController.addMedicine);          // POST /api/medicines
router.put('/:id', MedicineController.updateMedicine);     // PUT /api/medicines/:id
router.get('/search/:keyword', MedicineController.searchMedicines); // GET /api/medicines/search/:keyword

module.exports = router;
