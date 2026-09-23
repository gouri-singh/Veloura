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

// Guaranteed starter budget items starting at ₹200
const starterItems = [
  { title: "Casual Cotton T-Shirt", price: 200, category: "top", color: "White", platform: "Meesho", tags: ["casual", "top", "white"] },
  { title: "Comfort Stretch Leggings", price: 200, category: "bottom", color: "Black", platform: "Snapdeal", tags: ["comfort", "bottom", "black"] },
  { title: "Printed Ethnic Dupatta", price: 200, category: "ethnic", color: "Red", platform: "Flipkart", tags: ["casual", "ethnic", "red"] },
  { title: "Summer Ribbed Crop Top", price: 200, category: "western", color: "Yellow", platform: "Amazon", tags: ["summer", "western", "yellow"] },
  { title: "Soft Modal Tank Top", price: 215, category: "top", color: "Blue", platform: "Meesho", tags: ["casual", "top", "blue"] },
  { title: "Chic Linen Shorts", price: 230, category: "bottom", color: "Beige", platform: "Myntra", tags: ["summer", "bottom", "beige"] },
  { title: "Classic Printed Kurti", price: 249, category: "top", color: "Pink", platform: "Flipkart", tags: ["casual", "top", "pink"] },
  { title: "Breeze Floral Romper", price: 275, category: "western", color: "Green", platform: "Amazon", tags: ["summer", "western", "green"] },
  { title: "Boho Cotton Palazzos", price: 299, category: "bottom", color: "Olive", platform: "Snapdeal", tags: ["comfort", "bottom", "olive"] }
];

for (let item of starterItems) {
  products.push({
    id: idCounter++,
    ...item,
    image: `/images/${item.category}.png`,
    link: "#"
  });
}

// Generate remaining catalog with prices ranging from 200 up to 3999
for (let platform of platforms) {
  for (let i = 0; i < 13; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[category][Math.floor(Math.random() * nouns[category].length)];
    const title = `${adjective} ${color} ${noun}`;
    
    // Price range starting from ₹200 to ₹3999
    const price = Math.floor(Math.random() * (3999 - 200 + 1) + 200);
    
    const tagOptions = tagsPool[category];
    const tags = [tagOptions[Math.floor(Math.random() * tagOptions.length)], category, color.toLowerCase()];

    const image = `/images/${category}.png`;

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

// Write to frontend data
const frontendContent = `export const products = ${JSON.stringify(products, null, 2)};`;
fs.writeFileSync('C:/Users/hp/OneDrive/Desktop/Veloura/frontend/src/data/products.js', frontendContent);

// Write to backend data
const backendContent = `const products = ${JSON.stringify(products, null, 2)};\n\nmodule.exports = products;`;
fs.writeFileSync('C:/Users/hp/OneDrive/Desktop/Veloura/backend/data/products.js', backendContent);

console.log('Successfully generated ' + products.length + ' products starting from ₹200.');

