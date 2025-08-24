
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import BagLoader from '../components/BagLoader';

const NewArrivals: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample new arrival products
  const newArrivalProducts: Product[] = [
    {
      id: 'new_1',
      name: 'Midnight Elegance Candle',
      title: 'Midnight Elegance Candle',
      description: 'A sophisticated blend of black currant, vanilla, and sandalwood. Perfect for evening relaxation.',
      price: 49.99,
      originalPrice: 59.99,
      discount: 17,
      imageUrl: '/images/candles/candle-collection-1.png',
      category: 'Scented Candles',
      stock: 15,
      createdAt: new Date(),
      features: ['Premium black wax', 'Gold accents', 'Long burn time', 'Luxury packaging']
    },
    {
      id: 'new_2',
      name: 'Crystal Garden Collection',
      title: 'Crystal Garden Collection',
      description: 'Fresh botanical scents with embedded crystals for positive energy and beautiful aesthetics.',
      price: 65.00,
      originalPrice: 75.00,
      discount: 13,
      imageUrl: '/images/candles/candle-collection-2.png',
      category: 'Aromatherapy',
      stock: 12,
      createdAt: new Date(),
      features: ['Real crystals', 'Botanical scents', 'Energy healing', 'Unique design']
    },
    {
      id: 'new_3',
      name: 'Artisan Marble Candles',
      title: 'Artisan Marble Candles',
      description: 'Hand-marbled candles with unique patterns. Each piece is one-of-a-kind artwork.',
      price: 55.00,
      originalPrice: 68.00,
      discount: 19,
      imageUrl: '/images/candles/candle-collection-3.png',
      category: 'Decor Candles',
      stock: 8,
      createdAt: new Date(),
      features: ['Marble effect', 'Handcrafted', 'Unique patterns', 'Artistic design']
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(newArrivalProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <BagLoader size="large" text="Loading new arrivals..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center text-white hover:text-purple-200 transition-colors duration-200"
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
            <div className="inline-flex items-center bg-gradient-to-r from-purple-400 to-pink-400 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <SparklesIcon className="w-5 h-5 mr-2" />
              NEW ARRIVALS
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Fresh Collection
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Discover our latest handcrafted candles, featuring innovative designs and captivating fragrances
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest Additions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Be the first to experience our newest candle creations
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
              className="inline-flex items-center bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewArrivals;
