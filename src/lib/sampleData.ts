
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '../types';

export const sampleProducts: Omit<Product, 'id' | 'createdAt'>[] = [
  {
    name: "Floral Botanical Candle Set",
    title: "Floral Botanical Candle Set",
    description: "Beautiful handcrafted candles with real dried flowers embedded in natural soy wax. Perfect for creating a romantic and elegant atmosphere.",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    imageUrl: "/images/candles/candle-collection-6.jpg",
    category: "Scented Candles",
    stock: 15,
    features: ["Natural soy wax", "Real dried flowers", "Long-lasting burn", "Gift packaging included"]
  },
  {
    name: "Beeswax Pillar Candles",
    title: "Beeswax Pillar Candles",
    description: "Premium beeswax pillar candles with natural honeycomb texture. Burns cleanly with a subtle honey scent.",
    price: 64.99,
    originalPrice: 79.99,
    discount: 19,
    imageUrl: "/images/candles/candle-collection-7.jpg",
    category: "Soy Wax",
    stock: 12,
    features: ["100% natural beeswax", "Honeycomb texture", "Long burn time", "Clean burning"]
  },
  {
    name: "Ombre Gradient Candles",
    title: "Ombre Gradient Candles",
    description: "Stylish ombre gradient candles that transition from deep burgundy to soft pink. Perfect for modern home decor.",
    price: 45.99,
    originalPrice: 55.99,
    discount: 18,
    imageUrl: "/images/candles/candle-collection-8.jpg",
    category: "Decor Candles",
    stock: 20,
    features: ["Hand-dipped gradient", "Premium wax blend", "Modern design", "Unscented"]
  },
  {
    name: "Ceramic Tea Light Holders",
    title: "Ceramic Tea Light Holders",
    description: "Elegant ceramic tea light holders with intricate cut-out patterns that create beautiful light displays.",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    imageUrl: "/images/candles/candle-collection-9.jpg",
    category: "Aromatherapy",
    stock: 25,
    features: ["Handcrafted ceramic", "Intricate patterns", "Tea lights included", "Ambient lighting"]
  },
  {
    name: "Botanical Pillar Candles",
    title: "Botanical Pillar Candles",
    description: "Artistic pillar candles featuring dried botanicals and herbs. Each candle is unique with different botanical arrangements.",
    price: 52.99,
    originalPrice: 65.99,
    discount: 20,
    imageUrl: "/images/candles/candle-collection-10.jpg",
    category: "Gift Sets",
    stock: 18,
    features: ["Real botanicals", "Artistic design", "Natural fragrance", "Unique patterns"]
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
