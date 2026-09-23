const express = require('express');
const router = express.Router();
const products = require('../data/products');

// Mapping rule-sets for flattering colors based on skin tone swatches
const skinToneColorMap = {
    'Warm': ['Yellow', 'Orange', 'Gold', 'Red', 'Brown', 'Peach', 'Beige', 'Burgundy'],
    'Fair': ['Blue', 'Purple', 'Teal', 'Pink', 'White', 'Silver', 'Navy'],
    'Olive': ['Green', 'Olive', 'Teal', 'Gold', 'Brown', 'Orange', 'Burgundy', 'Yellow'],
    'Dark': ['White', 'Yellow', 'Gold', 'Pink', 'Silver', 'Red', 'Teal', 'Orange', 'Purple']
};

// POST /api/recommendations
// Accepts body: { skinTone, bodyShape, height, weight }
router.post('/', (req, res) => {
    const { skinTone, bodyShape } = req.body || {};

    const flatteringColors = skinTone && skinToneColorMap[skinTone] 
        ? skinToneColorMap[skinTone] 
        : ['Blue', 'White', 'Black', 'Red', 'Gold', 'Teal'];

    // Rules-based scoring function
    const scoredProducts = products.map(product => {
        let score = 0;
        let matchReasons = [];

        // Color score
        if (product.color && flatteringColors.includes(product.color)) {
            score += 40;
            matchReasons.push(`Complements ${skinTone || 'your'} skin tone`);
        }

        // Category / body shape preference score
        if (bodyShape === 'Hourglass' && (product.category === 'western' || product.category === 'ethnic')) {
            score += 30;
            matchReasons.push('Accentuates hourglass silhouette');
        } else if (bodyShape === 'Athletic' && (product.category === 'top' || product.category === 'bottom')) {
            score += 30;
            matchReasons.push('Great fit for athletic build');
        } else if (bodyShape === 'Pear' && product.category === 'western') {
            score += 30;
            matchReasons.push('Balancing proportion cut');
        } else if (bodyShape === 'Rectangle') {
            score += 20;
            matchReasons.push('Tailored structural fit');
        } else {
            score += 15;
            matchReasons.push('Popular user favorite');
        }

        return {
            ...product,
            score,
            matchReason: matchReasons.join(' • ')
        };
    });

    // Filter top matches and sort by price Low -> High as required by spec
    const recommendations = scoredProducts
        .filter(p => p.score >= 30)
        .sort((a, b) => a.price - b.price);

    res.json({
        total: recommendations.length,
        profileUsed: { skinTone, bodyShape },
        recommendations
    });
});

module.exports = router;
