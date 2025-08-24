
import mongoose from 'mongoose';
import Product from './models/Product.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-username:your-password@cluster0.mongodb.net/miraj-candles?retryWrites=true&w=majority';

const sampleProducts = [
  {
    name: "Luxury Gradient Candles",
    title: "Luxury Gradient Candles",
    description: "Elegant ombre candles with beautiful red-to-white gradient. Perfect for creating a warm and cozy atmosphere.",
    price: 45.99,
    originalPrice: 55.99,
    discount: 18,
    imageUrl: "/images/candles/candle-collection-1.png",
    category: "Candles",
    subcategory: "Scented Candles",
    stock: 15,
    features: ["Ombre design", "Long-lasting burn", "Premium wax", "Gift packaging"],
    status: "featured",
    weight: "500g",
    dimensions: "10cm x 8cm",
    materials: ["Soy wax", "Cotton wick", "Essential oils"],
    careInstructions: "Trim wick to 1/4 inch before lighting. Do not burn for more than 4 hours at a time.",
    tags: ["luxury", "gradient", "scented", "home decor"]
  },
  {
    name: "Vanilla Spice Warmth",
    title: "Vanilla Spice Warmth",
    description: "Warm and inviting vanilla spice candles that fill your home with comfort and coziness.",
    price: 38.99,
    originalPrice: 47.99,
    discount: 19,
    imageUrl: "/images/candles/candle-collection-2.png",
    category: "Candles",
    subcategory: "Scented Candles",
    stock: 30,
    features: ["Vanilla scent", "Spice notes", "Clean burn", "40-hour burn time"],
    status: "bestseller",
    weight: "450g",
    dimensions: "9cm x 7cm",
    materials: ["Soy wax", "Cotton wick", "Vanilla extract", "Spice oils"],
    careInstructions: "Keep away from drafts. Extinguish flame when 1/2 inch of wax remains.",
    tags: ["vanilla", "spice", "cozy", "bestseller"]
  },
  {
    name: "French Lavender Elegance",
    title: "French Lavender Elegance",
    description: "Premium French lavender scented candles for relaxation and stress relief.",
    price: 48.99,
    originalPrice: 58.99,
    discount: 17,
    imageUrl: "/images/candles/candle-collection-3.png",
    category: "Candles",
    subcategory: "Aromatherapy",
    stock: 22,
    features: ["French lavender", "Aromatherapy benefits", "Stress relief", "Premium quality"],
    status: "new",
    weight: "600g",
    dimensions: "12cm x 9cm",
    materials: ["Natural wax", "Organic cotton wick", "French lavender oil"],
    careInstructions: "Best used in well-ventilated areas. Allow to cool completely before moving.",
    tags: ["lavender", "aromatherapy", "relaxation", "french"]
  },
  {
    name: "Cute Animal Multi-Color Pens",
    title: "Cute Animal Multi-Color Pens",
    description: "Adorable animal-shaped multi-color pens with owl, avocado, flamingo, and pineapple designs. Perfect for kids' creative writing.",
    price: 12.99,
    originalPrice: 16.99,
    discount: 24,
    imageUrl: "/images/candles/candle-collection-4.png",
    category: "Kids Stationaries",
    stock: 30,
    features: ["Multiple colors", "Cute animal designs", "Child-safe materials", "Easy grip"],
    status: "trending",
    weight: "100g",
    dimensions: "15cm x 2cm",
    materials: ["Non-toxic plastic", "Smooth ink", "Ergonomic grip"],
    careInstructions: "Keep caps on when not in use. Store in a cool, dry place.",
    tags: ["kids", "pens", "animals", "colorful"]
  },
  {
    name: "Complete Stationery Gift Set",
    title: "Complete Stationery Gift Set",
    description: "Comprehensive stationery set with cute bear characters. Includes rulers, scissors, glue stick, and various writing tools.",
    price: 24.99,
    originalPrice: 32.99,
    discount: 24,
    imageUrl: "/images/candles/candle-collection-5.png",
    category: "Kids Stationaries",
    stock: 20,
    features: ["Complete set", "Bear character theme", "All essential tools", "Gift packaging"],
    status: "sale",
    weight: "350g",
    dimensions: "25cm x 20cm x 5cm",
    materials: ["High-quality plastic", "Metal components", "Safe adhesives"],
    careInstructions: "Adult supervision recommended for scissors. Keep small parts away from children under 3.",
    tags: ["stationery", "gift set", "bears", "complete"]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully!');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
}

seedDatabase();
