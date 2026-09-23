const products = [
  {
    "id": 1,
    "title": "Casual Cotton T-Shirt",
    "price": 200,
    "category": "top",
    "color": "White",
    "platform": "Meesho",
    "tags": [
      "casual",
      "top",
      "white"
    ],
    "image": "/images/top.png",
    "link": "#"
  },
  {
    "id": 2,
    "title": "Comfort Stretch Leggings",
    "price": 200,
    "category": "bottom",
    "color": "Black",
    "platform": "Snapdeal",
    "tags": [
      "comfort",
      "bottom",
      "black"
    ],
    "image": "/images/bottom.png",
    "link": "#"
  },
  {
    "id": 3,
    "title": "Printed Ethnic Dupatta",
    "price": 200,
    "category": "ethnic",
    "color": "Red",
    "platform": "Flipkart",
    "tags": [
      "casual",
      "ethnic",
      "red"
    ],
    "image": "/images/ethnic.png",
    "link": "#"
  },
  {
    "id": 4,
    "title": "Summer Ribbed Crop Top",
    "price": 200,
    "category": "western",
    "color": "Yellow",
    "platform": "Amazon",
    "tags": [
      "summer",
      "western",
      "yellow"
    ],
    "image": "/images/western.png",
    "link": "#"
  },
  {
    "id": 5,
    "title": "Soft Modal Tank Top",
    "price": 215,
    "category": "top",
    "color": "Blue",
    "platform": "Meesho",
    "tags": [
      "casual",
      "top",
      "blue"
    ],
    "image": "/images/top.png",
    "link": "#"
  },
  {
    "id": 6,
    "title": "Chic Linen Shorts",
    "price": 230,
    "category": "bottom",
    "color": "Beige",
    "platform": "Myntra",
    "tags": [
      "summer",
      "bottom",
      "beige"
    ],
    "image": "/images/bottom.png",
    "link": "#"
  },
  {
    "id": 7,
    "title": "Classic Printed Kurti",
    "price": 249,
    "category": "top",
    "color": "Pink",
    "platform": "Flipkart",
    "tags": [
      "casual",
      "top",
      "pink"
    ],
    "image": "/images/top.png",
    "link": "#"
  },
  {
    "id": 8,
    "title": "Breeze Floral Romper",
    "price": 275,
    "category": "western",
    "color": "Green",
    "platform": "Amazon",
    "tags": [
      "summer",
      "western",
      "green"
    ],
    "image": "/images/western.png",
    "link": "#"
  },
  {
    "id": 9,
    "title": "Boho Cotton Palazzos",
    "price": 299,
    "category": "bottom",
    "color": "Olive",
    "platform": "Snapdeal",
    "tags": [
      "comfort",
      "bottom",
      "olive"
    ],
    "image": "/images/bottom.png",
    "link": "#"
  },
  {
    "id": 10,
    "title": "Formal Red Shirt",
    "price": 3429,
    "category": "top",
    "color": "Red",
    "image": "/images/top.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "office",
      "top",
      "red"
    ]
  },
  {
    "id": 11,
    "title": "Sporty Burgundy Saree",
    "price": 1155,
    "category": "ethnic",
    "color": "Burgundy",
    "image": "/images/ethnic.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "casual",
      "ethnic",
      "burgundy"
    ]
  },
  {
    "id": 12,
    "title": "Casual Purple Kurti",
    "price": 1689,
    "category": "top",
    "color": "Purple",
    "image": "/images/top.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "winter",
      "top",
      "purple"
    ]
  },
  {
    "id": 13,
    "title": "Vintage Black Crop Top",
    "price": 1076,
    "category": "top",
    "color": "Black",
    "image": "/images/top.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "casual",
      "top",
      "black"
    ]
  },
  {
    "id": 14,
    "title": "Vintage Purple Anarkali",
    "price": 3947,
    "category": "ethnic",
    "color": "Purple",
    "image": "/images/ethnic.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "casual",
      "ethnic",
      "purple"
    ]
  },
  {
    "id": 15,
    "title": "Chic Teal Jeans",
    "price": 1694,
    "category": "bottom",
    "color": "Teal",
    "image": "/images/bottom.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "formal",
      "bottom",
      "teal"
    ]
  },
  {
    "id": 16,
    "title": "Trendy Black Hoodie",
    "price": 2810,
    "category": "top",
    "color": "Black",
    "image": "/images/top.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "party",
      "top",
      "black"
    ]
  },
  {
    "id": 17,
    "title": "Formal Gold Jeans",
    "price": 2087,
    "category": "bottom",
    "color": "Gold",
    "image": "/images/bottom.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "formal",
      "bottom",
      "gold"
    ]
  },
  {
    "id": 18,
    "title": "Elegant Beige Gown",
    "price": 1203,
    "category": "western",
    "color": "Beige",
    "image": "/images/western.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "summer",
      "western",
      "beige"
    ]
  },
  {
    "id": 19,
    "title": "Formal Grey Skirt",
    "price": 1975,
    "category": "bottom",
    "color": "Grey",
    "image": "/images/bottom.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "activewear",
      "bottom",
      "grey"
    ]
  },
  {
    "id": 20,
    "title": "Vintage Blue Lehenga",
    "price": 783,
    "category": "ethnic",
    "color": "Blue",
    "image": "/images/ethnic.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "traditional",
      "ethnic",
      "blue"
    ]
  },
  {
    "id": 21,
    "title": "Chic Beige Saree",
    "price": 1481,
    "category": "ethnic",
    "color": "Beige",
    "image": "/images/ethnic.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "wedding",
      "ethnic",
      "beige"
    ]
  },
  {
    "id": 22,
    "title": "Boho Brown Shorts",
    "price": 3173,
    "category": "bottom",
    "color": "Brown",
    "image": "/images/bottom.png",
    "platform": "Amazon",
    "link": "#",
    "tags": [
      "comfort",
      "bottom",
      "brown"
    ]
  },
  {
    "id": 23,
    "title": "Chic White Dress",
    "price": 488,
    "category": "western",
    "color": "White",
    "image": "/images/western.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "summer",
      "western",
      "white"
    ]
  },
  {
    "id": 24,
    "title": "Boho Gold Maxi Dress",
    "price": 2755,
    "category": "western",
    "color": "Gold",
    "image": "/images/western.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "date",
      "western",
      "gold"
    ]
  },
  {
    "id": 25,
    "title": "Chic Blue Joggers",
    "price": 1703,
    "category": "bottom",
    "color": "Blue",
    "image": "/images/bottom.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "formal",
      "bottom",
      "blue"
    ]
  },
  {
    "id": 26,
    "title": "Trendy Green Skirt",
    "price": 998,
    "category": "bottom",
    "color": "Green",
    "image": "/images/bottom.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "casual",
      "bottom",
      "green"
    ]
  },
  {
    "id": 27,
    "title": "Classic Gold Anarkali",
    "price": 3403,
    "category": "ethnic",
    "color": "Gold",
    "image": "/images/ethnic.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "traditional",
      "ethnic",
      "gold"
    ]
  },
  {
    "id": 28,
    "title": "Boho Red Blouse",
    "price": 2364,
    "category": "top",
    "color": "Red",
    "image": "/images/top.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "summer",
      "top",
      "red"
    ]
  },
  {
    "id": 29,
    "title": "Formal Yellow Gown",
    "price": 3150,
    "category": "western",
    "color": "Yellow",
    "image": "/images/western.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "summer",
      "western",
      "yellow"
    ]
  },
  {
    "id": 30,
    "title": "Chic Brown Leggings",
    "price": 3534,
    "category": "bottom",
    "color": "Brown",
    "image": "/images/bottom.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "formal",
      "bottom",
      "brown"
    ]
  },
  {
    "id": 31,
    "title": "Modern Purple Salwar Suit",
    "price": 783,
    "category": "ethnic",
    "color": "Purple",
    "image": "/images/ethnic.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "traditional",
      "ethnic",
      "purple"
    ]
  },
  {
    "id": 32,
    "title": "Boho White Gown",
    "price": 205,
    "category": "western",
    "color": "White",
    "image": "/images/western.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "date",
      "western",
      "white"
    ]
  },
  {
    "id": 33,
    "title": "Vintage Blue Sweater",
    "price": 2161,
    "category": "top",
    "color": "Blue",
    "image": "/images/top.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "summer",
      "top",
      "blue"
    ]
  },
  {
    "id": 34,
    "title": "Sporty Teal Joggers",
    "price": 2237,
    "category": "bottom",
    "color": "Teal",
    "image": "/images/bottom.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "activewear",
      "bottom",
      "teal"
    ]
  },
  {
    "id": 35,
    "title": "Classic Brown Shorts",
    "price": 1663,
    "category": "bottom",
    "color": "Brown",
    "image": "/images/bottom.png",
    "platform": "Flipkart",
    "link": "#",
    "tags": [
      "casual",
      "bottom",
      "brown"
    ]
  },
  {
    "id": 36,
    "title": "Boho Red Gown",
    "price": 1274,
    "category": "western",
    "color": "Red",
    "image": "/images/western.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "summer",
      "western",
      "red"
    ]
  },
  {
    "id": 37,
    "title": "Casual Yellow Shorts",
    "price": 2770,
    "category": "bottom",
    "color": "Yellow",
    "image": "/images/bottom.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "casual",
      "bottom",
      "yellow"
    ]
  },
  {
    "id": 38,
    "title": "Modern Navy Gown",
    "price": 2361,
    "category": "western",
    "color": "Navy",
    "image": "/images/western.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "summer",
      "western",
      "navy"
    ]
  },
  {
    "id": 39,
    "title": "Trendy White Mini Dress",
    "price": 2250,
    "category": "western",
    "color": "White",
    "image": "/images/western.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "date",
      "western",
      "white"
    ]
  },
  {
    "id": 40,
    "title": "Casual Teal Mini Dress",
    "price": 2943,
    "category": "western",
    "color": "Teal",
    "image": "/images/western.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "party",
      "western",
      "teal"
    ]
  },
  {
    "id": 41,
    "title": "Chic Green Leggings",
    "price": 1507,
    "category": "bottom",
    "color": "Green",
    "image": "/images/bottom.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "comfort",
      "bottom",
      "green"
    ]
  },
  {
    "id": 42,
    "title": "Modern Orange Salwar Suit",
    "price": 1354,
    "category": "ethnic",
    "color": "Orange",
    "image": "/images/ethnic.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "traditional",
      "ethnic",
      "orange"
    ]
  },
  {
    "id": 43,
    "title": "Formal Silver Salwar Suit",
    "price": 1426,
    "category": "ethnic",
    "color": "Silver",
    "image": "/images/ethnic.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "festive",
      "ethnic",
      "silver"
    ]
  },
  {
    "id": 44,
    "title": "Casual Gold Kurti",
    "price": 767,
    "category": "top",
    "color": "Gold",
    "image": "/images/top.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "office",
      "top",
      "gold"
    ]
  },
  {
    "id": 45,
    "title": "Casual Peach Saree",
    "price": 367,
    "category": "ethnic",
    "color": "Peach",
    "image": "/images/ethnic.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "traditional",
      "ethnic",
      "peach"
    ]
  },
  {
    "id": 46,
    "title": "Chic Navy Palazzos",
    "price": 2871,
    "category": "bottom",
    "color": "Navy",
    "image": "/images/bottom.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "casual",
      "bottom",
      "navy"
    ]
  },
  {
    "id": 47,
    "title": "Trendy Orange Leggings",
    "price": 2825,
    "category": "bottom",
    "color": "Orange",
    "image": "/images/bottom.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "formal",
      "bottom",
      "orange"
    ]
  },
  {
    "id": 48,
    "title": "Formal Peach Shorts",
    "price": 1796,
    "category": "bottom",
    "color": "Peach",
    "image": "/images/bottom.png",
    "platform": "Meesho",
    "link": "#",
    "tags": [
      "casual",
      "bottom",
      "peach"
    ]
  },
  {
    "id": 49,
    "title": "Elegant Blue Skirt",
    "price": 2567,
    "category": "bottom",
    "color": "Blue",
    "image": "/images/bottom.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "formal",
      "bottom",
      "blue"
    ]
  },
  {
    "id": 50,
    "title": "Boho White Romper",
    "price": 2979,
    "category": "western",
    "color": "White",
    "image": "/images/western.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "date",
      "western",
      "white"
    ]
  },
  {
    "id": 51,
    "title": "Vintage White Crop Top",
    "price": 3212,
    "category": "top",
    "color": "White",
    "image": "/images/top.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "office",
      "top",
      "white"
    ]
  },
  {
    "id": 52,
    "title": "Vintage Beige Sweater",
    "price": 2312,
    "category": "top",
    "color": "Beige",
    "image": "/images/top.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "party",
      "top",
      "beige"
    ]
  },
  {
    "id": 53,
    "title": "Sporty Beige Leggings",
    "price": 1697,
    "category": "bottom",
    "color": "Beige",
    "image": "/images/bottom.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "activewear",
      "bottom",
      "beige"
    ]
  },
  {
    "id": 54,
    "title": "Casual Peach Skirt",
    "price": 3846,
    "category": "bottom",
    "color": "Peach",
    "image": "/images/bottom.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "casual",
      "bottom",
      "peach"
    ]
  },
  {
    "id": 55,
    "title": "Modern Brown Lehenga",
    "price": 415,
    "category": "ethnic",
    "color": "Brown",
    "image": "/images/ethnic.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "festive",
      "ethnic",
      "brown"
    ]
  },
  {
    "id": 56,
    "title": "Casual Gold T-Shirt",
    "price": 3368,
    "category": "top",
    "color": "Gold",
    "image": "/images/top.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "winter",
      "top",
      "gold"
    ]
  },
  {
    "id": 57,
    "title": "Boho Grey Gown",
    "price": 3601,
    "category": "western",
    "color": "Grey",
    "image": "/images/western.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "date",
      "western",
      "grey"
    ]
  },
  {
    "id": 58,
    "title": "Formal Teal Joggers",
    "price": 3352,
    "category": "bottom",
    "color": "Teal",
    "image": "/images/bottom.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "formal",
      "bottom",
      "teal"
    ]
  },
  {
    "id": 59,
    "title": "Classic Navy Gown",
    "price": 1141,
    "category": "western",
    "color": "Navy",
    "image": "/images/western.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "summer",
      "western",
      "navy"
    ]
  },
  {
    "id": 60,
    "title": "Vintage Brown Palazzos",
    "price": 1255,
    "category": "bottom",
    "color": "Brown",
    "image": "/images/bottom.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "comfort",
      "bottom",
      "brown"
    ]
  },
  {
    "id": 61,
    "title": "Vintage Grey Dupatta",
    "price": 1016,
    "category": "ethnic",
    "color": "Grey",
    "image": "/images/ethnic.png",
    "platform": "Myntra",
    "link": "#",
    "tags": [
      "wedding",
      "ethnic",
      "grey"
    ]
  },
  {
    "id": 62,
    "title": "Modern Maroon Jacket",
    "price": 3994,
    "category": "top",
    "color": "Maroon",
    "image": "/images/top.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "party",
      "top",
      "maroon"
    ]
  },
  {
    "id": 63,
    "title": "Classic Beige Anarkali",
    "price": 2545,
    "category": "ethnic",
    "color": "Beige",
    "image": "/images/ethnic.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "traditional",
      "ethnic",
      "beige"
    ]
  },
  {
    "id": 64,
    "title": "Modern Gold Blouse",
    "price": 3802,
    "category": "top",
    "color": "Gold",
    "image": "/images/top.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "summer",
      "top",
      "gold"
    ]
  },
  {
    "id": 65,
    "title": "Casual Olive Palazzos",
    "price": 1648,
    "category": "bottom",
    "color": "Olive",
    "image": "/images/bottom.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "formal",
      "bottom",
      "olive"
    ]
  },
  {
    "id": 66,
    "title": "Trendy Brown Dupatta",
    "price": 1440,
    "category": "ethnic",
    "color": "Brown",
    "image": "/images/ethnic.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "festive",
      "ethnic",
      "brown"
    ]
  },
  {
    "id": 67,
    "title": "Elegant Orange Hoodie",
    "price": 2567,
    "category": "top",
    "color": "Orange",
    "image": "/images/top.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "winter",
      "top",
      "orange"
    ]
  },
  {
    "id": 68,
    "title": "Formal Beige Skirt",
    "price": 3426,
    "category": "bottom",
    "color": "Beige",
    "image": "/images/bottom.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "formal",
      "bottom",
      "beige"
    ]
  },
  {
    "id": 69,
    "title": "Formal Pink Lehenga",
    "price": 934,
    "category": "ethnic",
    "color": "Pink",
    "image": "/images/ethnic.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "traditional",
      "ethnic",
      "pink"
    ]
  },
  {
    "id": 70,
    "title": "Chic Blue Jumpsuit",
    "price": 2350,
    "category": "western",
    "color": "Blue",
    "image": "/images/western.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "date",
      "western",
      "blue"
    ]
  },
  {
    "id": 71,
    "title": "Formal Brown Kurta Set",
    "price": 839,
    "category": "ethnic",
    "color": "Brown",
    "image": "/images/ethnic.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "traditional",
      "ethnic",
      "brown"
    ]
  },
  {
    "id": 72,
    "title": "Vintage Navy Dress",
    "price": 1055,
    "category": "western",
    "color": "Navy",
    "image": "/images/western.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "party",
      "western",
      "navy"
    ]
  },
  {
    "id": 73,
    "title": "Modern Grey Jumpsuit",
    "price": 3705,
    "category": "western",
    "color": "Grey",
    "image": "/images/western.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "party",
      "western",
      "grey"
    ]
  },
  {
    "id": 74,
    "title": "Modern Silver Leggings",
    "price": 3593,
    "category": "bottom",
    "color": "Silver",
    "image": "/images/bottom.png",
    "platform": "Snapdeal",
    "link": "#",
    "tags": [
      "comfort",
      "bottom",
      "silver"
    ]
  }
];

module.exports = products;