import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock > 0) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
      toast.success(`${product.title} added to cart!`);
    } else {
      toast.error('Product out of stock');
    }
  };

  // Sample candle images for fallback
  const sampleImages = [
    'https://images.unsplash.com/photo-1602874801006-2bd9b9157e8d?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1571842893175-3ed4539c4226?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1544306094-7ad5b7e71c75?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=400&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop&auto=format'
  ];

  const getRandomSampleImage = () => {
    return sampleImages[Math.floor(Math.random() * sampleImages.length)];
  };

  const imageUrl = product.imageUrl && !product.imageUrl.includes('/api/placeholder')
    ? product.imageUrl
    : getRandomSampleImage();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card group"
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-black transition-colors duration-200">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-black">
              ${product.price.toFixed(2)}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                product.stock > 0
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCartIcon className="w-5 h-5" />
            </motion.button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;