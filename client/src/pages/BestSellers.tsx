
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, FireIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import BagLoader from '../components/BagLoader';

// Best sellers sample data
const bestSellerProducts: Product[] = [
  {
    id: 'bestseller_1',
    name: 'Classic Vanilla Dream',
    title: 'Classic Vanilla Dream',
    description: 'Our #1 bestselling vanilla candle with over 1000+ happy customers. Pure comfort in a jar.',
    price: 24.99,
    originalPrice: 32.99,
    discount: 24,
    imageUrl: '/images/candles/candle-collection-2.png',
    category: 'Scented Candles',
    stock: 25,
    features: ['#1 Bestseller', '1000+ reviews', 'Classic vanilla scent', 'Long-lasting'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'bestseller_2',
    name: 'Fresh Linen Breeze',
    title: 'Fresh Linen Breeze',
    description: 'Top-rated fresh linen candle that brings the feeling of clean laundry and spring air to your home.',
    price: 22.99,
    originalPrice: 29.99,
    discount: 23,
    imageUrl: '/images/candles/candle-collection-3.png',
    category: 'Scented Candles',
    stock: 30,
    features: ['Customer favorite', 'Fresh linen scent', 'Clean burning', '4.9★ rating'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'bestseller_3',
    name: 'Cozy Fireside Collection',
    title: 'Cozy Fireside Collection',
    description: 'Bestselling winter collection featuring warm, cozy scents perfect for creating intimate atmospheres.',
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    imageUrl: '/images/candles/candle-collection-4.png',
    category: 'Gift Sets',
    stock: 15,
    features: ['Winter bestseller', '3-candle set', 'Cozy scents', 'Perfect for gifting'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'bestseller_4',
    name: 'Tropical Paradise Escape',
    title: 'Tropical Paradise Escape',
    description: 'Transport yourself to paradise with this bestselling tropical blend of coconut, pineapple, and ocean breeze.',
    price: 27.99,
    originalPrice: 36.99,
    discount: 24,
    imageUrl: '/images/candles/candle-collection-5.png',
    category: 'Aromatherapy',
    stock: 22,
    features: ['Summer bestseller', 'Tropical blend', 'Vacation vibes', 'Mood lifting'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'bestseller_5',
    name: 'Zen Garden Meditation',
    title: 'Zen Garden Meditation',
    description: 'Most popular aromatherapy candle for meditation and relaxation. Features bamboo, green tea, and jasmine.',
    price: 31.99,
    originalPrice: 41.99,
    discount: 24,
    imageUrl: '/images/candles/candle-collection-1.png',
    category: 'Aromatherapy',
    stock: 18,
    features: ['Meditation favorite', 'Zen blend', 'Relaxation focused', 'Natural ingredients'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'bestseller_6',
    name: 'French Lavender Fields',
    title: 'French Lavender Fields',
    description: 'Authentic French lavender candle, consistently rated as our customers\' top choice for bedtime relaxation.',
    price: 28.99,
    originalPrice: 37.99,
    discount: 24,
    imageUrl: '/images/candles/candle-collection-2.png',
    category: 'Soy Wax',
    stock: 20,
    features: ['French lavender', 'Sleep aid', 'Top rated', 'Premium soy wax'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'bestseller_7',
    name: 'Cinnamon Spice Warmth',
    title: 'Cinnamon Spice Warmth',
    description: 'Holiday bestseller with warm cinnamon and spice blend. Perfect for creating festive atmospheres year-round.',
    price: 25.99,
    originalPrice: 33.99,
    discount: 24,
    imageUrl: '/images/candles/candle-collection-3.png',
    category: 'Scented Candles',
    stock: 26,
    features: ['Holiday favorite', 'Cinnamon spice', 'Year-round appeal', 'Warm ambiance'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'bestseller_8',
    name: 'Rose Petals Romance',
    title: 'Rose Petals Romance',
    description: 'Romantic bestseller perfect for special occasions. Delicate rose petals with hints of vanilla and musk.',
    price: 33.99,
    originalPrice: 44.99,
    discount: 24,
    imageUrl: '/images/candles/candle-collection-4.png',
    category: 'Decor Candles',
    stock: 12,
    features: ['Romantic favorite', 'Rose petals', 'Special occasions', 'Elegant design'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const BestSellers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(bestSellerProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <BagLoader size="large" text="Loading bestsellers..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center text-white hover:text-orange-200 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center bg-gradient-to-r from-orange-400 to-red-400 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <FireIcon className="w-5 h-5 mr-2" />
              BESTSELLERS
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Customer Favorites
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Discover the candles our customers love most. These top-rated products have consistently earned 5-star reviews and repeat purchases
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Most Loved by Customers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These are the candles that keep our customers coming back for more. Proven favorites with thousands of happy reviews
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestSellers;
