
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const allCategories = [
    {
      name: 'Kids Stationaries',
      image: '/images/candles/candle-collection-6.jpg',
      color: 'bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600',
      description: 'Fun and colorful stationery for kids',
      icon: '📝',
      productCount: 25,
      hasSubcategories: false
    },
    {
      name: 'Religious Products',
      image: '/images/candles/candle-collection-7.jpg',
      color: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600',
      description: 'Sacred items for spiritual practices',
      icon: '🕉️',
      productCount: 18,
      hasSubcategories: false
    },
    {
      name: 'Candles',
      image: '/images/candles/candle-collection-8.jpg',
      color: 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-600',
      description: 'Premium handcrafted candles',
      icon: '🕯️',
      productCount: 98,
      hasSubcategories: true
    },
    {
      name: 'Gifts',
      image: '/images/candles/candle-collection-10.jpg',
      color: 'bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-600',
      description: 'Perfect presents for loved ones',
      icon: '🎁',
      productCount: 15,
      hasSubcategories: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-orange-900 via-orange-800 to-purple-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              All Categories
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Explore our complete range of candle collections, each crafted with love and attention to detail
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
              >
                <div 
                  onClick={() => {
                    if (category.hasSubcategories) {
                      navigate('/candles-subcategories');
                    } else {
                      navigate(`/products?category=${category.name.toLowerCase().replace(' ', '-')}`);
                    }
                  }}
                >
                  <div className={`${category.color} h-48 relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white bg-opacity-20 rounded-full p-2">
                        <ArrowRightIcon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {category.productCount} products
                      </span>
                      <span className="text-orange-500 font-medium group-hover:text-orange-600 transition-colors duration-300">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
