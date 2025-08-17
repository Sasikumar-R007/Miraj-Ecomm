import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/SkeletonLoader';
import BagLoader from '../components/BagLoader';

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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);
  const [isLoadingBestSellers, setIsLoadingBestSellers] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "New Arrivals",
      subtitle: "Premium Handcrafted Candles",
      description: "Discover our latest collection of artisan candles, crafted with love and the finest natural ingredients.",
      image: "/images/candles/candle-collection-1.png",
      buttonText: "Shop New Collection",
      badge: "NEW"
    },
    {
      title: "On Discount",
      subtitle: "Up to 30% Off Soy Wax Collection",
      description: "Limited time offer! Experience the clean burn and extended life of our premium soy wax candles.",
      image: "/images/candles/candle-collection-2.png",
      buttonText: "Shop Sale",
      badge: "SALE"
    },
    {
      title: "Trending Now",
      subtitle: "Customer Favorites",
      description: "Our most loved aromatherapy candles trending among thousands of customers worldwide.",
      image: "/images/candles/candle-collection-4.png",
      buttonText: "Shop Trending",
      badge: "TRENDING"
    },
    {
      title: "Premium Gift Sets",
      subtitle: "Perfect for Every Occasion",
      description: "Beautifully packaged candle gift sets that create lasting memories for your loved ones.",
      image: "/images/candles/candle-collection-5.png",
      buttonText: "Browse Gifts",
      badge: "GIFT"
    }
  ];

  useEffect(() => {
    const fetchProductsData = async () => {
      // Use sample data immediately for faster loading
      setFeaturedProducts(sampleProducts.slice(0, 4));
      setBestSellers(sampleProducts.slice(4, 8));
      setIsLoadingFeatured(false);
      setIsLoadingBestSellers(false);

      // Optionally fetch from Firebase in background for real data
      try {
        const featuredQuery = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
          limit(4)
        );
        const bestSellersQuery = query(
          collection(db, 'products'),
          orderBy('sales', 'desc'),
          limit(4)
        );

        const [featuredSnapshot, bestSellersSnapshot] = await Promise.all([
          getDocs(featuredQuery),
          getDocs(bestSellersQuery)
        ]);

        const featuredProductsData = featuredSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        const bestSellersProductsData = bestSellersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];

        // Update with real data if available
        if (featuredProductsData.length > 0) {
          setFeaturedProducts(featuredProductsData);
        }

        if (bestSellersProductsData.length > 0) {
          setBestSellers(bestSellersProductsData);
        }

      } catch (error) {
        console.error('Error fetching products from Firebase:', error);
        // Keep sample data if Firebase fetch fails
      }
    };

    fetchProductsData();
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
      image: '/images/candles/candle-collection-6.jpg',
      color: 'bg-orange-500',
      description: 'Luxurious fragrances for every mood',
      icon: '🕯️'
    },
    {
      name: 'Soy Wax',
      image: '/images/candles/candle-collection-7.jpg',
      color: 'bg-green-500',
      description: 'Natural and eco-friendly options',
      icon: '🌿'
    },
    {
      name: 'Gift Sets',
      image: '/images/candles/candle-collection-10.jpg',
      color: 'bg-red-500',
      description: 'Perfect presents for loved ones',
      icon: '🎁'
    },
    {
      name: 'Decor Candles',
      image: '/images/candles/candle-collection-8.jpg',
      color: 'bg-purple-500',
      description: 'Beautiful designs for home styling',
      icon: '🏠'
    },
    {
      name: 'Aromatherapy',
      image: '/images/candles/candle-collection-9.jpg',
      color: 'bg-blue-500',
      description: 'Therapeutic scents for wellness',
      icon: '💧'
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
                    <div className="flex items-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        heroSlides[currentSlide].badge === 'NEW' ? 'bg-green-500' :
                        heroSlides[currentSlide].badge === 'SALE' ? 'bg-red-500' :
                        heroSlides[currentSlide].badge === 'TRENDING' ? 'bg-blue-500' :
                        'bg-purple-500'
                      } text-white`}>
                        {heroSlides[currentSlide].badge}
                      </span>
                    </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.slice(0, 4).map((category, index) => (
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

          <div className="text-center">
            <Link
              to="/categories"
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors duration-200"
            >
              View More Categories
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai, India",
                rating: 5,
                review: "Absolutely love the quality and fragrance of these candles! They burn evenly and the scent lasts for hours. Perfect for creating a relaxing ambiance.",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&auto=format"
              },
              {
                name: "Rahul Patel",
                location: "Delhi, India",
                rating: 5,
                review: "The best candles I've ever purchased! The soy wax collection is amazing and burns so cleanly. Great value for money.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format"
              },
              {
                name: "Anjali Singh",
                location: "Bangalore, India",
                rating: 5,
                review: "Beautiful packaging and exceptional quality. I ordered these as gifts and everyone loved them. Will definitely order again!",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format"
              },
              {
                name: "Vikram Gupta",
                location: "Chennai, India",
                rating: 5,
                review: "The aromatherapy collection is incredible. Helps me relax after a long day at work. Highly recommend to everyone!",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format"
              },
              {
                name: "Sneha Verma",
                location: "Pune, India",
                rating: 5,
                review: "Fast shipping and excellent customer service. The candles exceeded my expectations in terms of quality and fragrance.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format"
              },
              {
                name: "Arjun Mehta",
                location: "Hyderabad, India",
                rating: 5,
                review: "Premium quality candles at affordable prices. The gift sets are perfect for special occasions. Love the variety!",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format"
              }
            ].map((client, index) => (
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
                src="/images/candles/candle-collection-3.png"
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