
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '../types';

export const sampleProducts: Omit<Product, 'id' | 'createdAt'>[] = [
  {
    name: "Cute Animal Multi-Color Pens",
    title: "Cute Animal Multi-Color Pens",
    description: "Adorable animal-shaped multi-color pens with owl, avocado, flamingo, and pineapple designs. Perfect for kids' creative writing.",
    price: 12.99,
    originalPrice: 16.99,
    discount: 24,
    imageUrl: "/images/stationery/cute-animal-pens.jpg",
    category: "Kids Stationaries",
    stock: 30,
    features: ["Multiple colors", "Cute animal designs", "Child-safe materials", "Easy grip"]
  },
  {
    name: "Complete Stationery Gift Set",
    title: "Complete Stationery Gift Set",
    description: "Comprehensive stationery set with cute bear characters. Includes rulers, scissors, glue stick, and various writing tools.",
    price: 24.99,
    originalPrice: 32.99,
    discount: 24,
    imageUrl: "/images/stationery/complete-set.jpg",
    category: "Kids Stationaries",
    stock: 20,
    features: ["Complete set", "Bear character theme", "All essential tools", "Gift packaging"]
  },
  {
    name: "Space Theme Fountain Pen Set",
    title: "Space Theme Fountain Pen Set",
    description: "Adorable space-themed fountain pen set with astronaut bear design. Includes erasable ink cartridges.",
    price: 18.99,
    originalPrice: 24.99,
    discount: 24,
    imageUrl: "/images/stationery/space-fountain-pens.jpg",
    category: "Kids Stationaries",
    stock: 25,
    features: ["Space theme", "Fountain pen design", "Erasable ink", "Kid-friendly"]
  },
  {
    name: "24-Color Twin Marker Set",
    title: "24-Color Twin Marker Set",
    description: "Professional-quality twin tip markers in 24 vibrant colors. Perfect for drawing, coloring, and art projects.",
    price: 19.99,
    originalPrice: 26.99,
    discount: 26,
    imageUrl: "/images/stationery/twin-markers.jpg",
    category: "Kids Stationaries",
    stock: 35,
    features: ["24 colors", "Twin tips", "Vibrant colors", "Art quality"]
  },
  {
    name: "Fun Character Pencil Cases",
    title: "Fun Character Pencil Cases",
    description: "Cute character-themed pencil cases featuring space panda, space dinosaur, and astronaut designs.",
    price: 15.99,
    originalPrice: 21.99,
    discount: 27,
    imageUrl: "/images/stationery/character-cases.jpg",
    category: "Kids Stationaries",
    stock: 28,
    features: ["Character designs", "Spacious storage", "Durable material", "Kid-friendly"]
  },
  {
    name: "Luxury Gradient Candles",
    title: "Luxury Gradient Candles",
    description: "Elegant ombre candles with beautiful red-to-white gradient. Perfect for romantic dinners and special occasions.",
    price: 45.99,
    originalPrice: 55.99,
    discount: 18,
    imageUrl: "/images/candles/gradient-red-white.jpg",
    category: "Scented Candles",
    stock: 15,
    features: ["Hand-dipped gradient", "Premium wax blend", "Romantic ambiance", "Long burn time"]
  },
  {
    name: "Natural Soy Wax Collection",
    title: "Natural Soy Wax Collection",
    description: "Clean-burning soy wax candles in elegant glass containers. Made with natural ingredients for a pure experience.",
    price: 38.99,
    originalPrice: 47.99,
    discount: 19,
    imageUrl: "/images/candles/white-soy-candles.jpg",
    category: "Soy Wax",
    stock: 20,
    features: ["100% natural soy wax", "Glass containers", "Clean burning", "Eco-friendly"]
  },
  {
    name: "Decorative Tea Light Set",
    title: "Decorative Tea Light Set",
    description: "Colorful decorative tea lights with intricate patterns and metallic accents. Creates beautiful ambient lighting.",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    imageUrl: "/images/candles/decorative-tealights.jpg",
    category: "Decor Candles",
    stock: 25,
    features: ["Metallic patterns", "Colorful designs", "Tea light size", "Ambient lighting"]
  },
  {
    name: "Nature's Kiss Aromatherapy",
    title: "Nature's Kiss Aromatherapy",
    description: "Therapeutic candle in elegant black container. Infused with essential oils for relaxation and wellness.",
    price: 52.99,
    originalPrice: 65.99,
    discount: 20,
    imageUrl: "/images/candles/natures-kiss.jpg",
    category: "Aromatherapy",
    stock: 18,
    features: ["Essential oils", "Therapeutic benefits", "Black glass container", "Wellness formula"]
  },
  {
    name: "Lavender Dreams Collection",
    title: "Lavender Dreams Collection",
    description: "Soothing lavender-scented candles perfect for relaxation and stress relief. Made with pure lavender essential oil.",
    price: 42.99,
    originalPrice: 52.99,
    discount: 19,
    imageUrl: "/images/candles/candle-collection-1.png",
    category: "Aromatherapy",
    stock: 22,
    features: ["Pure lavender oil", "Stress relief", "Long burn time", "Calming scent"]
  },
  {
    name: "Vanilla Spice Warmth",
    title: "Vanilla Spice Warmth",
    description: "Warm and inviting vanilla spice candles that fill your space with cozy comfort. Perfect for autumn and winter evenings.",
    price: 38.99,
    originalPrice: 47.99,
    discount: 19,
    imageUrl: "/images/candles/candle-collection-2.png",
    category: "Scented Candles",
    stock: 30,
    features: ["Vanilla spice blend", "Cozy atmosphere", "Premium wax", "Long-lasting"]
  },
  {
    name: "Ocean Breeze Serenity",
    title: "Ocean Breeze Serenity",
    description: "Fresh ocean-inspired candles that bring the calming essence of the sea to your home.",
    price: 46.99,
    originalPrice: 58.99,
    discount: 20,
    imageUrl: "/images/candles/candle-collection-3.png",
    category: "Aromatherapy",
    stock: 16,
    features: ["Ocean-fresh scent", "Calming effect", "Natural ingredients", "Blue tones"]
  },
  {
    name: "Citrus Burst Energy",
    title: "Citrus Burst Energy",
    description: "Energizing citrus candles that invigorate your senses and brighten your day with zesty orange and lemon notes.",
    price: 41.99,
    originalPrice: 51.99,
    discount: 19,
    imageUrl: "/images/candles/candle-collection-4.png",
    category: "Scented Candles",
    stock: 28,
    features: ["Citrus blend", "Energizing scent", "Mood lifting", "Bright colors"]
  },
  {
    name: "Rose Garden Romance",
    title: "Rose Garden Romance",
    description: "Romantic rose-scented candles that create an enchanting ambiance for special moments and intimate evenings.",
    price: 55.99,
    originalPrice: 69.99,
    discount: 20,
    imageUrl: "/images/candles/candle-collection-5.png",
    category: "Gift Sets",
    stock: 14,
    features: ["Rose garden scent", "Romantic ambiance", "Premium quality", "Gift-ready packaging"]
  },
  {
    name: "Premium Gift Set",
    title: "Premium Gift Set",
    description: "Curated collection of our finest candles in beautiful gift packaging. Perfect for special occasions.",
    price: 75.00,
    originalPrice: 95.00,
    discount: 21,
    imageUrl: "/images/candles/candle-collection-6.jpg",
    category: "Gift Sets",
    stock: 12,
    features: ["Curated selection", "Gift packaging", "Premium quality", "Special occasions"]
  }
];

export const addSampleProducts = async (): Promise<void> => {
  try {
    // Check if products already exist
    const existingProductsQuery = query(collection(db, 'products'));
    const existingProducts = await getDocs(existingProductsQuery);
    
    if (existingProducts.empty) {
      console.log('Adding sample products...');
      
      for (const product of sampleProducts) {
        await addDoc(collection(db, 'products'), {
          ...product,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      
      console.log('Sample products added successfully!');
    } else {
      console.log('Products already exist in database');
    }
  } catch (error) {
    console.error('Error adding sample products:', error);
  }
};
