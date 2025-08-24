import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/SkeletonLoader';
import BagLoader from '../components/BagLoader';
import { BsStars, BsBoxSeam, BsBookHalf, BsShieldFillCheck } from 'react-icons/bs';


// Sample products to be used as a fallback if data fetching fails or returns empty
const sampleProducts: Product[] = [
  { id: 's1', name: 'Aromatic Lavender Candle', price: 25, description: 'Calming lavender scent', imageUrl: '/images/samples/lavender.jpg', category: 'Scented Candles', stock: 10, sales: 150 },
  { id: 's2', name: 'Energizing Citrus Candle', price: 28, description: 'Uplifting citrus aroma', imageUrl: '/images/samples/citrus.jpg', category: 'Scented Candles', stock: 8, sales: 120 },
  { id: 's3', name: 'Soothing Vanilla Candle', price: 22, description: 'Warm and comforting vanilla', imageUrl: '/images/samples/vanilla.jpg', category: 'Scented Candles', stock: 12, sales: 200 },
  { id: 's4', name: 'Eucalyptus Mint Soy Wax Candle', price: 30, description: 'Refreshing and clean scent', imageUrl: '/images/samples/eucalyptus.jpg', category: 'Soy Wax', stock: 15, sales: 180 },
  { id: 's5', name: 'Rose Garden Soy Wax Candle', price: 32, description: 'Delicate floral fragrance', imageUrl: '/images/samples/rose.jpg', category: 'Soy Wax', stock: 10, sales: 160 },
  { id: 's6', name: 'Sandalwood Bliss Soy Wax Candle', price: 35, description: 'Rich and woody aroma', imageUrl: '/images/samples/sandalwood.jpg', category: 'Soy Wax', stock: 7, sales: 220 },
  { id: 's7', name: 'Birthday Wish Candle Set', price: 50, description: 'Set of 3 celebratory candles', imageUrl: '/images/samples/gift-set-1.jpg', category: 'Gift Sets', stock: 20, sales: 90 },
  { id: 's8', name: 'Relaxation Gift Box', price: 65, description: 'Includes candle, diffuser, and bath bomb', imageUrl: '/images/samples/gift-set-2.jpg', category: 'Gift Sets', stock: 5, sales: 110 },
  { id: 's9', name: 'Minimalist White Pillar Candle', price: 18, description: 'Elegant design for decor', imageUrl: '/images/samples/decor-1.jpg', category: 'Decor Candles', stock: 25, sales: 70 },
  { id: 's10', name: 'Geometric Scented Candle', price: 20, description: 'Modern and stylish decor', imageUrl: '/images/samples/decor-2.jpg', category: 'Decor Candles', stock: 18, sales: 85 },
  { id: 's11', name: 'Citrus Burst Aromatherapy Candle', price: 33, description: 'Invigorating and mood-lifting', imageUrl: '/images/samples/aromatherapy-1.jpg', category: 'Aromatherapy', stock: 9, sales: 130 },
  { id: 's12', name: 'Lavender Dream Aromatherapy Candle', price: 33, description: 'Promotes relaxation and sleep', imageUrl: '/images/samples/aromatherapy-2.jpg', category: 'Aromatherapy', stock: 11, sales: 140 },
];

// Optimized fetchProducts function with no artificial delay
const fetchProducts = async (): Promise<Product[]> => {
  // Removed artificial delay for faster loading
  // In a real app, you would fetch from your database or API here
  // Example:
  // const q = query(collection(db, 'products'));
  // const querySnapshot = await getDocs(q);
  // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
  return sampleProducts; // Using sample data for now
};


const Home: React.FC = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [isLoadingBestSellers, setIsLoadingBestSellers] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, NY',
      rating: 5,
      review: 'Absolutely love these candles! The scents are amazing and they last so long.',
      image: '/images/miraj-logo.png'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Los Angeles, CA',
      rating: 5,
      review: 'Best quality candles I have ever purchased. Highly recommend!',
      image: '/images/miraj-logo.png'
    },
    {
      id: 3,
      name: 'Emily Davis',
      location: 'Chicago, IL',
      rating: 5,
      review: 'These candles create the perfect ambiance for my home. Love them!',
      image: '/images/miraj-logo.png'
    },
    {
      id: 4,
      name: 'James Rodriguez',
      location: 'Miami, FL',
      rating: 5,
      review: 'The aromatherapy candles have transformed my meditation sessions completely.',
      image: '/images/miraj-logo.png'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      location: 'Seattle, WA',
      rating: 5,
      review: 'Perfect gift sets! My family absolutely loved the beautiful packaging and quality.',
      image: '/images/miraj-logo.png'
    },
    {
      id: 6,
      name: 'David Park',
      location: 'Austin, TX',
      rating: 5,
      review: 'Clean burning, long-lasting, and incredible fragrances. Worth every penny!',
      image: '/images/miraj-logo.png'
    }
  ];

  const heroSlides = [
    {
      title: "New Arrivals",
      subtitle: "Premium Handcrafted Candles",
      description: "Discover our latest collection of artisan candles, crafted with love and the finest natural ingredients.",
      image: "/images/candles/candle-collection-1.png",
      buttonText: "Shop New Collection",
      badge: "NEW",
      link: "/new-arrivals"
    },
    {
      title: "On Discount",
      subtitle: "Up to 30% Off Soy Wax Collection",
      description: "Limited time offer! Experience the clean burn and extended life of our premium soy wax candles.",
      image: "/images/candles/candle-collection-2.png",
      buttonText: "Shop Sale",
      badge: "SALE",
      link: "/sale"
    },
    {
      title: "Trending Now",
      subtitle: "Customer Favorites",
      description: "Our most loved aromatherapy candles trending among thousands of customers worldwide.",
      image: "/images/candles/candle-collection-4.png",
      buttonText: "Shop Trending",
      badge: "TRENDING",
      link: "/trending"
    },
    {
      title: "Premium Gift Sets",
      subtitle: "Perfect for Every Occasion",
      description: "Beautifully packaged candle gift sets that create lasting memories for your loved ones.",
      image: "/images/candles/candle-collection-5.png",
      buttonText: "Browse Gifts",
      badge: "GIFT",
      link: "/gifts"
    }
  ];

  useEffect(() => {
    // Create products with proper IDs
    const productsWithIds = sampleProducts.map((product, index) => ({
      ...product,
      id: `sample_${index + 1}`,
      createdAt: new Date(),
      sales: Math.floor(Math.random() * 300) + 50
    }));

    // Use sample data immediately for faster loading
    setFeaturedProducts(productsWithIds.slice(0, 4));
    setBestSellers(productsWithIds.slice(4, 8));
    setIsLoadingFeatured(false);
    setIsLoadingBestSellers(false);
  }, []);


  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000); // Changed to 4 seconds for better user experience

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const categories = [
    {
      name: 'Kids Stationaries',
      image: '/images/candles/candle-collection-6.jpg',
      categoryImage: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center',
      color: 'bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600',
      description: 'Fun and colorful stationery for kids',
      hasSubcategories: false
    },
    {
      name: 'Religious Products',
      image: '/images/candles/candle-collection-7.jpg',
      categoryImage: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=100&h=100&fit=crop&crop=center',
      color: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600',
      description: 'Sacred items for spiritual practices',
      hasSubcategories: false
    },
    {
      name: 'Candles',
      image: '/images/candles/candle-collection-8.jpg',
      categoryImage: 'https://images.unsplash.com/photo-1602874801006-52c7282d2138?w=100&h=100&fit=crop&crop=center',
      color: 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-600',
      description: 'Premium handcrafted candles',
      hasSubcategories: true,
      subcategories: [
        { name: 'Scented Candles', description: 'Luxurious fragrances for every mood' },
        { name: 'Soy Wax', description: 'Natural and eco-friendly options' },
        { name: 'Decor Candles', description: 'Beautiful designs for home styling' },
        { name: 'Aromatherapy', description: 'Therapeutic scents for wellness' }
      ]
    },
    {
      name: 'Gifts',
      image: '/images/candles/candle-collection-10.jpg',
      categoryImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=100&h=100&fit=crop&crop=center',
      color: 'bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-600',
      description: 'Perfect presents for loved ones',
      hasSubcategories: false
    }
  ];

  // Animation for the shopping cart (selling theme)
  const cartVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: { scale: [1, 1.2, 1.1, 1.2, 1], rotate: [0, 10, -10, 10, 0] },
    transition: { duration: 0.8, ease: "easeInOut" }
  };

  const coinVariants = {
    initial: { opacity: 0, y: 50, rotate: -45 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    transition: { duration: 0.5, delay: 0.2 }
  };

  return (
    <div className="min-h-screen">

      {/* Auto-Sliding Hero Banner Section */}
      <section className="bg-gradient-to-br from-gray-50 via-orange-50 to-pink-50 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {heroSlides[currentSlide].badge}
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
                >
                  {heroSlides[currentSlide].title}
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    {heroSlides[currentSlide].subtitle}
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-gray-600 leading-relaxed"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Link
                    to={heroSlides[currentSlide].link}
                    className="inline-flex items-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-5 rounded-2xl font-medium text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                  >
                    {heroSlides[currentSlide].buttonText}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRightIcon className="w-6 h-6 ml-3" />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full opacity-30 blur-3xl"></div>
                <img
                  src={heroSlides[currentSlide].image}
                  alt="Miraj Candles Collection"
                  className="w-full h-auto object-contain relative z-10 drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="bg-white/90 hover:bg-white text-gray-700 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-gray-200"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="bg-white/90 hover:bg-white text-gray-700 p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-gray-200"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Categories
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -20,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden rounded-3xl shadow-xl group cursor-pointer transform"
              >
                {category.hasSubcategories ? (
                  <div onClick={() => navigate('/candles-subcategories')}>
                    <div className="relative h-80 bg-white">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 ${category.color} opacity-90`}></div>
                      
                      {/* Category Image */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-4 border-white/30"
                        >
                          <img 
                            src={category.categoryImage} 
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </div>
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pt-24">
                        <motion.h3
                          className="text-white text-2xl font-bold mb-3"
                          whileHover={{ scale: 1.05 }}
                        >
                          {category.name}
                        </motion.h3>
                        <p className="text-white/90 text-sm mb-4 leading-relaxed">
                          {category.description}
                        </p>
                        <motion.div
                          className="text-xs text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30"
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Has Subcategories
                        </motion.div>
                      </div>
                      
                      {/* Arrow */}
                      <motion.div
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                        initial={{ x: 10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <ArrowRightIcon className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <Link to={`/products?category=${category.name.toLowerCase().replace(' ', '-')}`}>
                    <div className="relative h-80 bg-white">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 ${category.color} opacity-90`}></div>
                      
                      {/* Category Image */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-4 border-white/30"
                        >
                          <img 
                            src={category.categoryImage} 
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </div>
                      
                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 pt-24">
                        <motion.h3
                          className="text-white text-2xl font-bold mb-3"
                          whileHover={{ scale: 1.05 }}
                        >
                          {category.name}
                        </motion.h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                      
                      {/* Arrow */}
                      <motion.div
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                        initial={{ x: 10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <ArrowRightIcon className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/products"
                className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <motion.span
                  initial={{ x: -5 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  All Categories
                </motion.span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium candles, crafted with love and attention to detail.
            </p>
          </div>
          {isLoadingFeatured ? (
            <BagLoader size="large" text="Loading featured products..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View All Products
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Sellers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular candles that customers love and keep coming back for.
            </p>
          </div>
          {isLoadingBestSellers ? (
            <BagLoader size="large" text="Loading bestsellers..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {bestSellers.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View All Products
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Happy Clients Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Happy Clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our customers say about their
              experience with Miraj Candles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-600">{client.location}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(client.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 italic">"{client.review}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-white to-transparent rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block bg-gradient-to-r from-orange-400 to-pink-400 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
                >
                  Our Story
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Crafted with Passion
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-xl text-gray-200 leading-relaxed">
                  At Miraj Candles, we believe in the transformative power of fragrance.
                  Each candle is meticulously handcrafted using premium natural waxes and
                  carefully selected fragrance oils.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our commitment to quality ensures that every Miraj candle delivers
                  exceptional scent throw, clean burning, and hours of aromatic bliss.
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Learn Our Story
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRightIcon className="w-5 h-5 ml-3" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl opacity-20 blur-3xl transform rotate-6"></div>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src="/images/candles/candle-collection-3.png"
                  alt="Candle Making Process"
                  className="rounded-3xl shadow-2xl relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-3xl z-20"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;