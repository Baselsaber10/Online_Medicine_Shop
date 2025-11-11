const express = require('express');
const app = express();

// Parse JSON
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Connect routes
app.use('/api/users', userRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`MediShop backend running on http://localhost:${PORT}`);
});
