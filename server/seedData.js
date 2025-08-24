
import connectDB from './lib/mongodb.js';
import Product from './models/Product.js';

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
    tags: ["vanilla", "spice", "warm", "bestseller"]
  },
  {
    name: "Citrus Fresh Collection",
    title: "Citrus Fresh Collection",
    description: "Energizing citrus candles that brighten any space with fresh, uplifting fragrances.",
    price: 42.99,
    originalPrice: 52.99,
    discount: 19,
    imageUrl: "/images/candles/candle-collection-3.png",
    category: "Candles",
    subcategory: "Aromatherapy",
    stock: 22,
    features: ["Citrus blend", "Energizing", "Natural oils", "Eco-friendly"],
    status: "new",
    weight: "400g",
    dimensions: "8cm x 9cm",
    materials: ["Soy wax", "Cotton wick", "Citrus oils"],
    careInstructions: "Burn in well-ventilated area. Keep wick centered.",
    tags: ["citrus", "fresh", "energizing", "natural"]
  },
  {
    name: "Romantic Rose Garden",
    title: "Romantic Rose Garden",
    description: "Delicate rose-scented candles perfect for romantic evenings and special occasions.",
    price: 48.99,
    originalPrice: 59.99,
    discount: 18,
    imageUrl: "/images/candles/candle-collection-4.png",
    category: "Candles",
    subcategory: "Romantic",
    stock: 18,
    features: ["Rose fragrance", "Romantic ambiance", "Premium quality", "Long-lasting"],
    status: "trending",
    weight: "520g",
    dimensions: "11cm x 8cm",
    materials: ["Soy wax", "Cotton wick", "Rose oil"],
    careInstructions: "Perfect for dinner dates. Burn for 2-3 hours at a time.",
    tags: ["rose", "romantic", "floral", "premium"]
  },
  {
    name: "Ocean Breeze Serenity",
    title: "Ocean Breeze Serenity",
    description: "Fresh ocean-inspired candles that bring the calming essence of sea breeze to your home.",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    imageUrl: "/images/candles/candle-collection-5.png",
    category: "Candles",
    subcategory: "Aromatherapy",
    stock: 25,
    features: ["Ocean scent", "Calming", "Stress relief", "Natural ingredients"],
    status: "sale",
    weight: "380g",
    dimensions: "9cm x 8cm",
    materials: ["Soy wax", "Cotton wick", "Marine extracts"],
    careInstructions: "Ideal for meditation and relaxation.",
    tags: ["ocean", "calming", "aromatherapy", "natural"]
  }
];

async function seedDatabase() {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
