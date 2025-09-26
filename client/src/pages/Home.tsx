import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/SkeletonLoader';
import BagLoader from '../components/BagLoader';
import { BsStars, BsBoxSeam, BsBookHalf, BsShieldFillCheck } from 'react-icons/bs';
import { MongoService } from '../services/mongoService';

// Optimized fetchProducts function using MongoService API
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const products = await MongoService.getProducts();
    return products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
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
      id: 1,
      mainTitle: "100% Natural",
      subtitle: "Candles & Aromatherapy",
      description: "Free shipping on all your orders. We deliver, you enjoy!",
      discount: "43%",
      buttonText: "Shop Now",
      link: "/products",
      mainImage: "/images/candles/candle-collection-1.png",
      promoCards: [
        {
          title: "25% OFF",
          subtitle: "Orange Zest Candles",
          description: "Starting at $9.99",
          image: "/images/candles/candle-collection-2.png",
          buttonText: "Shop Now",
          bgColor: "bg-gradient-to-br from-orange-100 to-orange-200",
          link: "/products?category=candles&scent=citrus"
        },
        {
          title: "BEST DEAL",
          subtitle: "Coconut Soy Candles",
          description: "Natural & Pure",
          image: "/images/candles/candle-collection-4.png",
          buttonText: "Shop Now",
          bgColor: "bg-gradient-to-br from-green-700 to-green-800 text-white",
          link: "/products?category=candles&type=soy"
        }
      ]
    },
    {
      id: 2,
      mainTitle: "Premium Quality",
      subtitle: "Handcrafted Soy Candles", 
      description: "Experience the finest natural ingredients in every candle!",
      discount: "30%",
      buttonText: "Shop Now",
      link: "/products",
      mainImage: "/images/candles/candle-collection-3.png",
      promoCards: [
        {
          title: "LIMITED TIME",
          subtitle: "Lavender Dreams",
          description: "Starting at $12.99",
          image: "/images/candles/candle-collection-5.png",
          buttonText: "Shop Now",
          bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
          link: "/products?category=candles&scent=lavender"
        },
        {
          title: "NEW ARRIVAL",
          subtitle: "Vanilla Essence",
          description: "Pure & Organic",
          image: "/images/candles/candle-collection-6.jpg",
          buttonText: "Shop Now", 
          bgColor: "bg-gradient-to-br from-yellow-600 to-yellow-700 text-white",
          link: "/products?category=candles&scent=vanilla"
        }
      ]
    },
    {
      id: 3,
      mainTitle: "Trending Now",
      subtitle: "Customer Favorites",
      description: "Most loved aromatherapy candles trending worldwide!",
      discount: "25%",
      buttonText: "Shop Trending",
      link: "/trending",
      mainImage: "/images/candles/candle-collection-7.jpg",
      promoCards: [
        {
          title: "HOT DEAL",
          subtitle: "Rose Garden",
          description: "Starting at $8.99",
          image: "/images/candles/candle-collection-8.jpg",
          buttonText: "Shop Now",
          bgColor: "bg-gradient-to-br from-pink-100 to-rose-200",
          link: "/products?category=candles&scent=floral"
        },
        {
          title: "BESTSELLER",
          subtitle: "Ocean Breeze",
          description: "Fresh & Clean",
          image: "/images/candles/candle-collection-9.jpg",
          buttonText: "Shop Now",
          bgColor: "bg-gradient-to-br from-blue-600 to-blue-700 text-white",
          link: "/products?category=candles&scent=ocean"
        }
      ]
    }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoadingFeatured(true);
        setIsLoadingBestSellers(true);
        
        const products = await fetchProducts();
        
        if (products.length > 0) {
          // Filter or organize products for different sections
          // Featured: products marked as featured or first 4
          const featured = products.filter(p => p.status === 'featured').slice(0, 4) || products.slice(0, 4);
          // Best sellers: products marked as bestseller or based on sales
          const bestselling = products.filter(p => p.status === 'bestseller').slice(0, 4) || products.slice(4, 8);
          
          setFeaturedProducts(featured);
          setBestSellers(bestselling);
        }
      } catch (error) {
        console.error('Error loading products:', error);
        // Set empty arrays on error
        setFeaturedProducts([]);
        setBestSellers([]);
      } finally {
        setIsLoadingFeatured(false);
        setIsLoadingBestSellers(false);
      }
    };
    
    loadProducts();
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
      name: 'Candles',
      displayName: 'Candles',
      image: '/images/candles/candle-collection-8.jpg',
      categoryImage: '/images/categories/candles.jpg',
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
      name: 'Religious Products',
      displayName: 'Religious Products',
      image: '/images/candles/candle-collection-7.jpg',
      categoryImage: '/images/categories/religious-products.jpg',
      color: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600',
      description: 'Sacred items for spiritual practices',
      hasSubcategories: false
    },
    {
      name: 'Kids Stationery',
      displayName: 'Kids Stationery',
      image: '/images/candles/candle-collection-6.jpg',
      categoryImage: '/images/categories/kids-stationery.jpg',
      color: 'bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600',
      description: 'Fun and colorful stationery for kids',
      hasSubcategories: false
    },
    {
      name: 'Gifts',
      displayName: 'Gifts',
      image: '/images/candles/candle-collection-10.jpg',
      categoryImage: '/images/categories/gifts.jpg',
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

      {/* Hero Banner Section - Shopery Style */}
      <section className="bg-white py-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              {/* Left Side - Main Content */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  {/* Discount Badge */}
                  <div className="absolute -top-4 left-8 bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-lg z-10">
                    {heroSlides[currentSlide].discount}
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {heroSlides[currentSlide].mainTitle}
                    <br />
                    <span className="text-2xl lg:text-3xl text-gray-600 font-normal">
                      {heroSlides[currentSlide].subtitle}
                    </span>
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to={heroSlides[currentSlide].link}
                    className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {heroSlides[currentSlide].buttonText}
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Link>
                </motion.div>

                {/* Main Product Image */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative lg:hidden"
                >
                  <img
                    src={heroSlides[currentSlide].mainImage}
                    alt={heroSlides[currentSlide].mainTitle}
                    className="w-full max-w-md mx-auto h-72 object-cover rounded-2xl shadow-lg"
                  />
                </motion.div>
              </div>

              {/* Right Side - Product Grid & Main Image */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Promo Cards */}
                  {heroSlides[currentSlide].promoCards.map((card, index) => (
                    <Link key={index} to={card.link}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className={`${card.bgColor} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-sm font-semibold mb-1 opacity-90">{card.title}</p>
                            <h3 className="text-lg font-bold mb-2">{card.subtitle}</h3>
                            <p className="text-sm opacity-80 mb-3">{card.description}</p>
                            <span className="text-sm font-medium underline hover:no-underline transition-all">
                              {card.buttonText} →
                            </span>
                          </div>
                          <img
                            src={card.image}
                            alt={card.subtitle}
                            className="w-16 h-16 object-cover rounded-xl"
                          />
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
                
                {/* Main Product Display */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg"
                >
                  <img
                    src={heroSlides[currentSlide].mainImage}
                    alt={heroSlides[currentSlide].mainTitle}
                    className="w-full h-64 object-contain"
                  />
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 transition-all duration-300 ${
                  currentSlide === index
                    ? 'bg-green-600 rounded-sm'
                    : 'bg-gray-300 hover:bg-gray-400 rounded-sm'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Feature Icons Row */}
        <div className="mt-16 bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BsBoxSeam className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-600">Free shipping on all your order</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Customer Support 24/7</h4>
                  <p className="text-sm text-gray-600">Instant access to support</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BsShieldFillCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">100% Secure Payment</h4>
                  <p className="text-sm text-gray-600">We ensure your money is save</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center space-x-3"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Money-Back Guarantee</h4>
                  <p className="text-sm text-gray-600">30 days money-back guarantee</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Category Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Category</h2>
          </motion.div>

          {/* Category Icons Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-12">
            {categories.slice(0, 4).map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`text-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  index === 0 
                    ? 'bg-orange-500 text-white border-orange-500' 
                    : 'bg-white border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => {
                  if (category.hasSubcategories) {
                    navigate('/candles-subcategories');
                  } else {
                    navigate(`/products?category=${category.name.toLowerCase().replace(' ', '-')}`);
                  }
                }}
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg overflow-hidden">
                  <img
                    src={category.categoryImage}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-1">{category.displayName}</h3>
                <p className={`text-sm ${index === 0 ? 'text-orange-100' : 'text-gray-500'}`}>
                  {category.name === 'Candles' ? '98 Items' : 
                   category.name === 'Religious Products' ? '18 Items' :
                   category.name === 'Kids Stationery' ? '25 Items' : '15 Items'}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Promotional Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Aromatherapy Collection Card */}
              <Link to="/products?category=candles&subcategory=aromatherapy">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl overflow-hidden p-8 text-white cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative z-10">
                    <p className="text-sm font-medium text-gray-300 mb-2">UP TO 20% OFF</p>
                    <h3 className="text-2xl font-bold mb-2">Aromatherapy Collection</h3>
                    <p className="text-gray-300 mb-6">Don't miss week long savings on wellness candles</p>
                    <span className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block">
                      Shop Now →
                    </span>
                  </div>
                  <img
                    src="/images/candles/candle-collection-3.png"
                    alt="Aromatherapy candles"
                    className="absolute right-0 bottom-0 w-32 h-32 object-cover opacity-80"
                  />
                </motion.div>
              </Link>

              {/* Soy Wax Sale Card */}
              <Link to="/sale">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden p-8 cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative z-10">
                    <p className="text-sm font-medium text-gray-700 mb-2">UP TO 30% OFF</p>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">Save On Soy Wax</h3>
                    <p className="text-gray-700 mb-6">Natural, eco-friendly candles at unbeatable prices</p>
                    <span className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block">
                      Shop Now →
                    </span>
                  </div>
                  <img
                    src="/images/candles/candle-collection-5.png"
                    alt="Soy wax candles"
                    className="absolute right-4 bottom-4 w-28 h-28 object-cover"
                  />
                </motion.div>
              </Link>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* New Arrivals Card */}
              <Link to="/new-arrivals">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl overflow-hidden p-8 cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative z-10">
                    <p className="text-sm font-medium text-orange-700 mb-2">NEW ARRIVALS</p>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">Fresh Candle Collections</h3>
                    <p className="text-gray-700 mb-6">Discover our latest handcrafted candle designs</p>
                    <span className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-block">
                      Shop Now →
                    </span>
                  </div>
                  <img
                    src="/images/candles/candle-collection-7.jpg"
                    alt="New candle arrivals"
                    className="absolute right-0 bottom-0 w-32 h-32 object-cover rounded-xl"
                  />
                  <div className="absolute right-8 top-4">
                    <img
                      src="/images/candles/candle-collection-8.jpg"
                      alt="Decorative candle"
                      className="w-16 h-20 object-cover rounded-lg"
                    />
                  </div>
                </motion.div>
              </Link>

              {/* Gift Sets Showcase Card */}
              <Link to="/gifts">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden h-64 cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src="/images/candles/candle-collection-9.jpg"
                    alt="Premium candle gift sets"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-sm font-medium mb-2">SPECIAL COLLECTION</p>
                    <h3 className="text-xl font-bold mb-2">Premium Gift Sets</h3>
                    <span className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-white/30 inline-block">
                      Explore →
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
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
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              to="/featured"
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View All Featured Products
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
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              to="/bestsellers"
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View All Best Sellers
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