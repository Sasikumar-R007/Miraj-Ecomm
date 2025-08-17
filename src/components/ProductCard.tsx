import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  // const [isWishlisted, setIsWishlisted] = useState(false); // Removed to use context state
  const [imageError, setImageError] = useState(false);

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

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  // Premium candle images
  const sampleImages = [
    '/images/candles/candle-collection-1.png',
    '/images/candles/candle-collection-2.png',
    '/images/candles/candle-collection-3.png',
    '/images/candles/candle-collection-4.png',
    '/images/candles/candle-collection-5.png',
    '/images/candles/candle-collection-6.jpg',
    '/images/candles/candle-collection-7.jpg',
    '/images/candles/candle-collection-8.jpg',
    '/images/candles/candle-collection-9.jpg',
    '/images/candles/candle-collection-10.jpg'
  ];

  const getProductImage = () => {
    // Use product ID to consistently select the same image for each product
    const imageIndex = parseInt(product.id.slice(-1)) || 0;
    return sampleImages[imageIndex % sampleImages.length];
  };

  const imageUrl = product.imageUrl && !product.imageUrl.includes('/api/placeholder')
    ? product.imageUrl
    : getProductImage();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card group"
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={imageError ? sampleImages[0] : imageUrl}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full shadow-md transition-all duration-200"
          >
            {isInWishlist(product.id) ? (
              <HeartIconSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
            )}
          </button>
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
              ₹{(product.price * 80).toFixed(0)}
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