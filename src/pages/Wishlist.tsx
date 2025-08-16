import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState([
    // Sample wishlist items
    {
      id: '1',
      title: 'Lavender Dreams Candle',
      price: 899,
      originalPrice: 1200,
      image: 'https://images.unsplash.com/photo-1602874801006-2bd9b9157e8d?w=400&h=400&fit=crop&auto=format',
      inStock: true
    },
    {
      id: '2',
      title: 'Vanilla Bliss Soy Candle',
      price: 749,
      originalPrice: 999,
      image: 'https://images.unsplash.com/photo-1571842893175-3ed4539c4226?w=400&h=400&fit=crop&auto=format',
      inStock: true
    }
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
    toast.success('Removed from wishlist');
  };

  const addToCart = (item: any) => {
    toast.success(`${item.title} added to cart!`);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeartIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">
              Start adding products you love to your wishlist by clicking the heart icon.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Explore Products
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <HeartIconSolid className="w-10 h-10 text-red-500 mr-3" />
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </motion.div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                >
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <Link to={`/products/${item.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-orange-500 transition-colors duration-200">
                    {item.title}
                  </h3>
                </Link>

                <div className="flex items-center mb-3">
                  <span className="text-lg font-bold text-orange-500">
                    ₹{item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₹{item.originalPrice}
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(item)}
                  disabled={!item.inStock}
                  className={`w-full flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    item.inStock
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
          >
            Continue Shopping
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;