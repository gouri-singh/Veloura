require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const feedbackRoutes = require('./routes/feedback');
const productsRoutes = require('./routes/products');
const recommendationsRoutes = require('./routes/recommendations');
const wardrobeRoutes = require('./routes/wardrobe');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/wardrobe', wardrobeRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Veloura API is running' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
