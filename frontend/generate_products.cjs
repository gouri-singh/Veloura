const fs = require('fs');

const platforms = ['Amazon', 'Flipkart', 'Meesho', 'Myntra', 'Snapdeal'];
const categories = ['top', 'bottom', 'ethnic', 'western'];
const colors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Grey', 'Brown', 'Beige', 'Maroon', 'Gold', 'Silver', 'Navy', 'Olive', 'Teal', 'Burgundy', 'Peach'];

const adjectives = ['Classic', 'Trendy', 'Elegant', 'Casual', 'Formal', 'Chic', 'Vintage', 'Modern', 'Boho', 'Sporty'];
const nouns = {
  top: ['Shirt', 'T-Shirt', 'Blouse', 'Crop Top', 'Kurti', 'Sweater', 'Hoodie', 'Jacket'],
  bottom: ['Jeans', 'Trousers', 'Leggings', 'Palazzos', 'Skirt', 'Shorts', 'Joggers'],
  ethnic: ['Saree', 'Salwar Suit', 'Lehenga', 'Anarkali', 'Kurta Set', 'Dupatta'],
  western: ['Dress', 'Gown', 'Jumpsuit', 'Romper', 'Maxi Dress', 'Mini Dress']
};

const tagsPool = {
  top: ['casual', 'office', 'party', 'summer', 'winter'],
  bottom: ['casual', 'formal', 'comfort', 'activewear'],
  ethnic: ['festive', 'wedding', 'traditional', 'casual'],
  western: ['party', 'evening', 'summer', 'date']
};

let products = [];
let idCounter = 1;

for (let platform of platforms) {
  for (let i = 0; i < 15; i++) { // 15 per platform = 75 total
    const category = categories[Math.floor(Math.random() * categories.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[category][Math.floor(Math.random() * nouns[category].length)];
    const title = `${adjective} ${color} ${noun}`;
    
    // Budget to premium
    const price = Math.floor(Math.random() * (3999 - 299 + 1) + 299);
    
    // Tags
    const tagOptions = tagsPool[category];
    const tags = [tagOptions[Math.floor(Math.random() * tagOptions.length)], category, color.toLowerCase()];

    // Placeholder image
    const encodedTitle = encodeURIComponent(title);
    const image = `https://placehold.co/400x600/1e1e1e/d4af37?text=${encodedTitle}`;

    products.push({
      id: idCounter++,
      title,
      price,
      category,
      color,
      image,
      platform,
      link: "#",
      tags
    });
  }
}

// Shuffle products
for (let i = products.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [products[i], products[j]] = [products[j], products[i]];
}

const fileContent = `export const products = ${JSON.stringify(products, null, 2)};`;

fs.writeFileSync('C:/Users/hp/OneDrive/Desktop/Veloura/frontend/src/data/products.js', fileContent);
console.log('Successfully generated ' + products.length + ' products.');
