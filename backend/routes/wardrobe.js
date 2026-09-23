const express = require('express');
const router = express.Router();
const products = require('../data/products');

// Category mapping: Includes preferred category first, then complementary pairings
const categoryComboMap = {
    'top': ['top', 'bottom'],
    'bottom': ['bottom', 'top'],
    'ethnic': ['ethnic', 'top', 'bottom'],
    'western': ['western', 'top', 'bottom']
};

// Complementary color pairings
const colorHarmonyMap = {
    'Blue': ['White', 'Black', 'Beige', 'Grey', 'Orange', 'Yellow'],
    'White': ['Blue', 'Black', 'Red', 'Green', 'Olive', 'Purple', 'Maroon', 'Teal', 'Pink'],
    'Black': ['White', 'Red', 'Yellow', 'Silver', 'Gold', 'Pink', 'Burgundy', 'Teal'],
    'Red': ['Black', 'White', 'Beige', 'Navy'],
    'Green': ['White', 'Beige', 'Brown', 'Black', 'Gold'],
    'Yellow': ['Blue', 'Black', 'Navy', 'White'],
    'Pink': ['White', 'Grey', 'Navy', 'Black'],
    'Purple': ['White', 'Silver', 'Beige'],
    'Brown': ['White', 'Beige', 'Teal', 'Green'],
    'Olive': ['White', 'Beige', 'Black'],
    'Burgundy': ['White', 'Black', 'Silver'],
    'Teal': ['White', 'Beige', 'Coral', 'Gold'],
    'Gold': ['Black', 'White', 'Maroon', 'Red'],
    'Silver': ['Black', 'White', 'Blue', 'Purple'],
    'Beige': ['White', 'Black', 'Blue', 'Green', 'Brown', 'Olive', 'Gold']
};

// POST /api/wardrobe/match
// Accepts body: { category, color, title, image }
router.post('/match', (req, res) => {
    const { category, color } = req.body || {};

    const selectedCat = (category || 'top').toLowerCase();
    const targetCategories = categoryComboMap[selectedCat] || [selectedCat, 'top', 'bottom'];
    const harmoniousColors = colorHarmonyMap[color] || ['White', 'Black', 'Blue', 'Beige'];

    // Find matching clothing items from catalog
    const matches = products.filter(product => {
        const prodCat = product.category.toLowerCase();
        const isTargetCategory = targetCategories.includes(prodCat);
        const isHarmoniousColor = product.color && (
            harmoniousColors.includes(product.color) || 
            product.color.toLowerCase() === (color || '').toLowerCase() ||
            product.color.toLowerCase() === 'white' || 
            product.color.toLowerCase() === 'black'
        );
        return isTargetCategory && isHarmoniousColor;
    });

    // Sort matching suggestions by preferred category first, then price (lowest first)
    matches.sort((a, b) => {
        const aIsExact = a.category.toLowerCase() === selectedCat ? 0 : 1;
        const bIsExact = b.category.toLowerCase() === selectedCat ? 0 : 1;
        if (aIsExact !== bIsExact) return aIsExact - bIsExact;
        return a.price - b.price;
    });

    res.json({
        uploadedItem: { category, color },
        complementaryCategory: targetCategories.join(', '),
        suggestedColors: harmoniousColors,
        matches
    });
});

module.exports = router;
