
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useLoading } from '../context/LoadingContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { setLoading } = useLoading();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct({
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
          } as Product);
        } else {
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, setLoading]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-w-1 aspect-h-1 bg-gray-300 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mock additional images for demo
  const images = [product.imageUrl, product.imageUrl, product.imageUrl];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Products
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="aspect-w-1 aspect-h-1 w-full mb-4">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-96 object-cover object-center rounded-lg"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-gray-900' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-24 object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">(4.0) 24 reviews</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Category</h3>
              <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Availability</h3>
              <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>

            {product.stock > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="input w-24"
                  >
                    {[...Array(Math.min(10, product.stock))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full btn-primary flex items-center justify-center py-3"
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  Add to Cart
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ShoppingCartIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductDetailSkeleton } from '../components/SkeletonLoader';
import toast from 'react-hot-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productDoc = await getDoc(doc(db, 'products', id));
        
        if (productDoc.exists()) {
          const productData = {
            id: productDoc.id,
            ...productDoc.data(),
            createdAt: productDoc.data().createdAt?.toDate() || new Date()
          } as Product;
          setProduct(productData);
        } else {
          toast.error('Product not found');
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Error loading product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.stock < quantity) {
      toast.error('Not enough stock available');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    
    toast.success(`${quantity} ${product.title}(s) added to cart!`);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Mock additional images - in real app, you'd have multiple images per product
  const images = [product.imageUrl, product.imageUrl, product.imageUrl];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/products')}
          className="flex items-center text-gray-600 hover:text-black transition-colors duration-200 mb-8"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Products
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {images.length > 1 && (
                <div className="flex space-x-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                        selectedImage === index
                          ? 'border-black'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-xl text-gray-600 capitalize">
                {product.category}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-black">
                ${product.price.toFixed(2)}
              </span>
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">
                  {product.stock} in stock
                </span>
              ) : (
                <span className="text-red-600 font-medium">
                  Out of stock
                </span>
              )}
            </div>

            <div className="prose prose-gray max-w-none">
              <p>{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center btn-primary py-4 text-lg"
                >
                  <ShoppingCartIcon className="w-6 h-6 mr-2" />
                  Add to Cart
                </motion.button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {isFavorite ? (
                  <HeartIconSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span>Favorite</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <ShareIcon className="w-5 h-5" />
                <span>Share</span>
              </motion.button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Details
              </h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="text-gray-900 capitalize">{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Stock:</dt>
                  <dd className="text-gray-900">{product.stock} units</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Added:</dt>
                  <dd className="text-gray-900">
                    {product.createdAt.toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
