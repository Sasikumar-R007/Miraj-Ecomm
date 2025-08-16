
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/SkeletonLoader';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Illuminate Your Space",
      subtitle: "Premium Handcrafted Candles",
      description: "Discover our exquisite collection of artisan candles, crafted with love and the finest natural ingredients.",
      image: "/api/placeholder/800/500",
      buttonText: "Shop Candles"
    },
    {
      title: "Pure Soy Wax Collection",
      subtitle: "Eco-Friendly & Long Lasting",
      description: "Experience the clean burn and extended life of our premium soy wax candles, made with natural ingredients.",
      image: "/api/placeholder/800/500",
      buttonText: "Explore Soy Wax"
    },
    {
      title: "Aromatherapy Bliss",
      subtitle: "Wellness Through Fragrance",
      description: "Transform your mood and enhance your well-being with our therapeutic aromatherapy candle collection.",
      image: "/api/placeholder/800/500",
      buttonText: "Find Your Scent"
    },
    {
      title: "Perfect Gift Sets",
      subtitle: "Thoughtfully Curated",
      description: "Surprise your loved ones with our beautifully packaged candle gift sets for every special occasion.",
      image: "/api/placeholder/800/500",
      buttonText: "Browse Gifts"
    }
  ];

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
          limit(4)
        );
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date()
        })) as Product[];
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

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
      name: 'Scented Candles', 
      image: '/api/placeholder/300/200', 
      color: 'bg-orange-500',
      description: 'Luxurious fragrances for every mood',
      icon: '🕯️'
    },
    { 
      name: 'Soy Wax', 
      image: '/api/placeholder/300/200', 
      color: 'bg-green-500',
      description: 'Natural and eco-friendly options',
      icon: '🌿'
    },
    { 
      name: 'Gift Sets', 
      image: '/api/placeholder/300/200', 
      color: 'bg-red-500',
      description: 'Perfect presents for loved ones',
      icon: '🎁'
    },
    { 
      name: 'Decor Candles', 
      image: '/api/placeholder/300/200', 
      color: 'bg-purple-500',
      description: 'Beautiful designs for home styling',
      icon: '🏠'
    },
    { 
      name: 'Aromatherapy', 
      image: '/api/placeholder/300/200', 
      color: 'bg-blue-500',
      description: 'Therapeutic scents for wellness',
      icon: '💧'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-orange-900 to-orange-700"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-white"
                  >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                      {heroSlides[currentSlide].title}
                      <span className="block text-orange-300 text-3xl md:text-4xl mt-2">
                        {heroSlides[currentSlide].subtitle}
                      </span>
                    </h1>
                    <p className="text-xl text-orange-100 mb-8 max-w-lg">
                      {heroSlides[currentSlide].description}
                    </p>
                    <Link
                      to="/products"
                      className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors duration-200"
                    >
                      {heroSlides[currentSlide].buttonText}
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative"
                  >
                    <img
                      src={heroSlides[currentSlide].image}
                      alt="Miraj Candles"
                      className="rounded-lg shadow-2xl"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-orange-500' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
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
              Our Candle Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From handcrafted soy wax to luxury scented candles, discover our complete range 
              of premium candles designed to illuminate and inspire your space.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <Link to={`/products?category=${category.name.toLowerCase().replace(' ', '-')}`}>
                  <div className={`${category.color} h-64 relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="text-white text-xl font-bold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white text-sm opacity-90">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bestselling Candles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most loved candles, handpicked by customers for their exceptional 
              fragrance, quality, and burn time.
            </p>
          </motion.div>

          {loading ? (
            <ProductGridSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link 
              to="/products" 
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors duration-200"
            >
              Shop All Candles
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Crafted with Passion
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                At Miraj Candles, we believe in the transformative power of fragrance. 
                Each candle is meticulously handcrafted using premium natural waxes and 
                carefully selected fragrance oils.
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Our commitment to quality ensures that every Miraj candle delivers 
                exceptional scent throw, clean burning, and hours of aromatic bliss.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Learn Our Story
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/api/placeholder/600/400"
                alt="Candle Making Process"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-orange-500 bg-opacity-20 rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Illuminated
            </h2>
            <p className="text-lg text-orange-100 mb-8">
              Subscribe to our newsletter for exclusive offers, new collection launches, 
              and candle care tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-orange-500 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
