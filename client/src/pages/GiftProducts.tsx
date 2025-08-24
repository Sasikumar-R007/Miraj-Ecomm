
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, GiftIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import BagLoader from '../components/BagLoader';

const GiftProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample gift products
  const giftProducts: Product[] = [
    {
      id: 'gift_1',
      name: 'Luxury Gift Box Deluxe',
      title: 'Luxury Gift Box Deluxe',
      description: 'The ultimate gift experience with premium candles, elegant packaging, and personalized note.',
      price: 125.00,
      originalPrice: 150.00,
      discount: 17,
      imageUrl: '/images/candles/candle-collection-10.jpg',
      category: 'Gift Sets',
      stock: 12,
      createdAt: new Date(),
      features: ['Premium packaging', 'Personalized note', 'Multiple candles', 'Gift ready']
    },
    {
      id: 'gift_2',
      name: 'Anniversary Romance Set',
      title: 'Anniversary Romance Set',
      description: 'Perfect for celebrating love with romantic scents and elegant presentation.',
      price: 89.99,
      originalPrice: 109.99,
      discount: 18,
      imageUrl: '/images/candles/candle-collection-1.png',
      category: 'Gift Sets',
      stock: 8,
      createdAt: new Date(),
      features: ['Romantic scents', 'Couple themed', 'Anniversary card', 'Elegant box']
    },
    {
      id: 'gift_3',
      name: 'Birthday Celebration Bundle',
      title: 'Birthday Celebration Bundle',
      description: 'Make birthdays special with this festive candle collection and celebration accessories.',
      price: 67.99,
      originalPrice: 84.99,
      discount: 20,
      imageUrl: '/images/candles/candle-collection-2.png',
      category: 'Gift Sets',
      stock: 15,
      createdAt: new Date(),
      features: ['Birthday themed', 'Festive scents', 'Party accessories', 'Celebration ready']
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(giftProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <BagLoader size="large" text="Loading gift products..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center text-white hover:text-green-200 transition-colors duration-200"
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
            <div className="inline-flex items-center bg-gradient-to-r from-green-400 to-emerald-400 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <GiftIcon className="w-5 h-5 mr-2" />
              PERFECT GIFTS
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Gift Collections
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Thoughtfully curated gift sets that create lasting memories for every special occasion
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thoughtfully Curated
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Give the gift of ambiance and luxury with our specially designed gift collections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GiftProducts;
