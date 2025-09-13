
import { connectDB } from './lib/mongodb.js';
import Product from './models/Product.js';

const sampleProducts = [
  {
    name: "Lavender Bliss Candle",
    description: "A calming lavender scented candle perfect for relaxation and aromatherapy. Hand-poured with natural soy wax.",
    price: 24.99,
    category: "Candles",
    subcategory: "Aromatherapy",
    images: ["/images/candles/candle-collection-1.png"],
    stock: 50,
    featured: true,
    bestSeller: true,
    sales: 156,
    rating: 4.8,
    reviews: 23
  },
  {
    name: "Vanilla Dream Candle",
    description: "Warm and inviting vanilla scented candle that creates a cozy atmosphere in any room.",
    price: 22.99,
    category: "Candles", 
    subcategory: "Classic Scents",
    images: ["/images/candles/candle-collection-2.png"],
    stock: 35,
    bestSeller: true,
    sales: 134,
    rating: 4.6,
    reviews: 18
  },
  {
    name: "Ocean Breeze Candle",
    description: "Fresh and invigorating ocean scent that brings the seaside into your home.",
    price: 26.99,
    category: "Candles",
    subcategory: "Fresh Scents",
    images: ["/images/candles/candle-collection-3.png"],
    stock: 42,
    newArrival: true,
    sales: 89,
    rating: 4.7,
    reviews: 15
  },
  {
    name: "Cinnamon Spice Candle",
    description: "Warm and spicy cinnamon scented candle perfect for autumn and winter seasons.",
    price: 23.99,
    category: "Candles",
    subcategory: "Seasonal",
    images: ["/images/candles/candle-collection-4.png"],
    stock: 28,
    trending: true,
    sales: 98,
    rating: 4.5,
    reviews: 12
  },
  {
    name: "Rose Garden Candle",
    description: "Elegant rose scented candle with a sophisticated floral fragrance.",
    price: 28.99,
    category: "Candles",
    subcategory: "Floral",
    images: ["/images/candles/candle-collection-5.png"],
    stock: 31,
    featured: true,
    sales: 76,
    rating: 4.9,
    reviews: 19
  },
  {
    name: "Eucalyptus Mint Candle",
    description: "Refreshing eucalyptus and mint blend for a spa-like experience at home.",
    price: 25.99,
    category: "Candles",
    subcategory: "Aromatherapy",
    images: ["/images/candles/candle-collection-6.jpg"],
    stock: 39,
    newArrival: true,
    sales: 67,
    rating: 4.4,
    reviews: 11
  },
  {
    name: "Sandalwood Serenity",
    description: "Rich and woody sandalwood scent for meditation and relaxation.",
    price: 29.99,
    category: "Candles",
    subcategory: "Aromatherapy", 
    images: ["/images/candles/candle-collection-7.jpg"],
    stock: 25,
    trending: true,
    sales: 45,
    rating: 4.6,
    reviews: 8
  },
  {
    name: "Citrus Burst Candle",
    description: "Energizing blend of orange, lemon, and grapefruit for a bright, uplifting atmosphere.",
    price: 24.99,
    category: "Candles",
    subcategory: "Citrus",
    images: ["/images/candles/candle-collection-8.jpg"],
    stock: 44,
    bestSeller: true,
    sales: 123,
    rating: 4.7,
    reviews: 16
  }
];

async function seedDatabase() {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    
    console.log('Database seeded successfully!');
    console.log(`Inserted ${sampleProducts.length} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
