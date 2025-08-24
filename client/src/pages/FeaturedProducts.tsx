
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, StarIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import BagLoader from '../components/BagLoader';

// Featured products sample data
const featuredProducts: Product[] = [
  {
    id: 'featured_1',
    name: 'Premium Lavender Candle',
    title: 'Premium Lavender Candle',
    description: 'Hand-poured premium lavender candle with natural soy wax. Perfect for relaxation and aromatherapy.',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    imageUrl: '/images/candles/candle-collection-1.png',
    category: 'Scented Candles',
    stock: 15,
    features: ['Natural soy wax', 'Hand-poured', 'Long-lasting scent', 'Eco-friendly'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'featured_2',
    name: 'Vanilla Bean Luxury Candle',
    title: 'Vanilla Bean Luxury Candle',
    description: 'Rich vanilla bean scented candle made with premium ingredients for the ultimate luxury experience.',
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    imageUrl: '/images/candles/candle-collection-2.png',
    category: 'Scented Candles',
    stock: 12,
    features: ['Premium vanilla bean', 'Luxury packaging', '40+ hour burn time', 'Gift ready'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'featured_3',
    name: 'Ocean Breeze Candle Set',
    title: 'Ocean Breeze Candle Set',
    description: 'Fresh ocean breeze scented candle set with three different sizes for any occasion.',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    imageUrl: '/images/candles/candle-collection-3.png',
    category: 'Gift Sets',
    stock: 8,
    features: ['3-piece set', 'Ocean breeze scent', 'Various sizes', 'Perfect for gifting'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'featured_4',
    name: 'Rose Garden Aromatherapy',
    title: 'Rose Garden Aromatherapy',
    description: 'Therapeutic rose garden candle designed to promote relaxation and reduce stress.',
    price: 37.99,
    originalPrice: 49.99,
    discount: 24,
    imageUrl: '/images/candles/candle-collection-4.png',
    category: 'Aromatherapy',
    stock: 20,
    features: ['Therapeutic benefits', 'Rose garden scent', 'Stress relief', 'Premium quality'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'featured_5',
    name: 'Citrus Burst Energy Candle',
    title: 'Citrus Burst Energy Candle',
    description: 'Energizing citrus burst candle to invigorate your senses and boost your mood.',
    price: 26.99,
    originalPrice: 34.99,
    discount: 23,
    imageUrl: '/images/candles/candle-collection-5.png',
    category: 'Aromatherapy',
    stock: 18,
    features: ['Energizing scent', 'Mood boosting', 'Citrus blend', 'Natural ingredients'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'featured_6',
    name: 'Eucalyptus Mint Wellness',
    title: 'Eucalyptus Mint Wellness',
    description: 'Refreshing eucalyptus mint candle for wellness and mental clarity.',
    price: 32.99,
    originalPrice: 42.99,
    discount: 23,
    imageUrl: '/images/candles/candle-collection-1.png',
    category: 'Soy Wax',
    stock: 14,
    features: ['Eucalyptus mint blend', 'Mental clarity', 'Wellness focused', 'Clean burning'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(featuredProducts);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <BagLoader size="large" text="Loading featured products..." />
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
            <div className="inline-flex items-center bg-gradient-to-r from-purple-400 to-blue-400 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6">
              <StarIcon className="w-5 h-5 mr-2" />
              FEATURED COLLECTION
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Featured Products
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Discover our handpicked selection of premium candles, carefully chosen for their exceptional quality and unique fragrances
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Handpicked Excellence
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our featured collection showcases the finest candles in our catalog, selected for their outstanding quality and customer favorites
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
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedProducts;
