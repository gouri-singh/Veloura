const express = require('express');
const router = express.Router();
const products = require('../data/products');

// GET /api/products
// Query parameters: search, category, color, platform, minPrice, maxPrice, sort (default: price_asc)
router.get('/', (req, res) => {
    let result = [...products];
    const { search, category, color, platform, minPrice, maxPrice, sort } = req.query;

    if (search) {
        const q = search.toLowerCase();
        result = result.filter(p => 
            p.title.toLowerCase().includes(q) || 
            p.category.toLowerCase().includes(q) || 
            (p.color && p.color.toLowerCase().includes(q)) ||
            (p.platform && p.platform.toLowerCase().includes(q)) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
        );
    }

    if (category && category !== 'all') {
        result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (color && color !== 'all') {
        result = result.filter(p => p.color && p.color.toLowerCase() === color.toLowerCase());
    }

    if (platform && platform !== 'all') {
        result = result.filter(p => p.platform && p.platform.toLowerCase() === platform.toLowerCase());
    }

    if (minPrice) {
        result = result.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
        result = result.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Default sort: Price Low -> High as required in spec
    if (sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
    } else if (sort === 'title_asc') {
        result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        // Default or price_asc
        result.sort((a, b) => a.price - b.price);
    }

    res.json(result);
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

module.exports = router;
