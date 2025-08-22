
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnelIcon, MagnifyingGlassIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/SkeletonLoader';
import BagLoader from '../components/BagLoader';

// Sample products data for faster initial load
const sampleProducts: Product[] = [
  {
    id: 'sample1',
    name: 'Lavender Dreams Candle',
    title: 'Lavender Dreams Candle',
    description: 'A soothing lavender scented candle perfect for relaxation.',
    price: 25.99,
    category: 'Scented Candles',
    imageUrl: '/images/candles/candle-collection-1.png',
    stock: 10,
    sales: 150,
    createdAt: new Date()
  },
  {
    id: 'sample2',
    name: 'Natural Soy Wax Candle',
    title: 'Natural Soy Wax Candle',
    description: 'Eco-friendly soy wax candle with vanilla scent.',
    price: 19.50,
    category: 'Soy Wax',
    imageUrl: '/images/candles/candle-collection-2.png',
    stock: 15,
    sales: 200,
    createdAt: new Date()
  },
  {
    id: 'sample3',
    name: 'Premium Gift Set',
    title: 'Premium Gift Set',
    description: 'A curated gift set for special occasions.',
    price: 75.00,
    category: 'Gift Sets',
    imageUrl: '/images/candles/candle-collection-3.png',
    stock: 8,
    sales: 90,
    createdAt: new Date()
  },
  {
    id: 'sample4',
    name: 'Elegant Decor Candle',
    title: 'Elegant Decor Candle',
    description: 'Decorative candle perfect for home styling.',
    price: 30.00,
    category: 'Decor Candles',
    imageUrl: '/images/candles/candle-collection-4.png',
    stock: 12,
    sales: 85,
    createdAt: new Date()
  },
  {
    id: 'sample5',
    name: 'Aromatherapy Blend',
    title: 'Aromatherapy Blend',
    description: 'Therapeutic candle with essential oils for wellness.',
    price: 35.75,
    category: 'Aromatherapy',
    imageUrl: '/images/candles/candle-collection-5.png',
    stock: 20,
    sales: 180,
    createdAt: new Date()
  }
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [showCategories, setShowCategories] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const categories = [
    {
      name: 'Scented Candles',
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      description: 'Luxurious fragrances for every mood',
      icon: '🕯️',
      count: 0
    },
    {
      name: 'Soy Wax',
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      description: 'Natural and eco-friendly options',
      icon: '🌿',
      count: 0
    },
    {
      name: 'Gift Sets',
      color: 'bg-gradient-to-br from-red-400 to-red-600',
      description: 'Perfect presents for loved ones',
      icon: '🎁',
      count: 0
    },
    {
      name: 'Decor Candles',
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      description: 'Beautiful designs for home styling',
      icon: '🏠',
      count: 0
    },
    {
      name: 'Aromatherapy',
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      description: 'Therapeutic scents for wellness',
      icon: '💧',
      count: 0
    }
  ];

  // Update categories with product counts
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    count: products.filter(product => 
      product.category.toLowerCase() === category.name.toLowerCase()
    ).length
  }));

  useEffect(() => {
    // Check URL parameters for category and search
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category && category !== 'all') {
      setSelectedCategory(category);
      setShowCategories(false);
    }
    
    if (search) {
      setSearchTerm(search);
      setShowCategories(false);
    }

    // Load sample data immediately with proper IDs
    const productsWithIds = sampleProducts.map((product, index) => ({
      ...product,
      id: `sample_${index + 1}`,
      createdAt: new Date()
    }));
    
    setProducts(productsWithIds);
    setIsLoading(false);
  }, [searchParams]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        (product.name || product.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by price range
    const [minPrice, maxPrice] = priceRange;
    filtered = filtered.filter(product =>
      product.price >= minPrice && product.price <= maxPrice
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => (a.name || a.title || '').localeCompare(b.name || b.title || ''));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName.toLowerCase());
    setShowCategories(false);
    setSearchParams({ category: categoryName.toLowerCase() });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSortBy('newest');
    setShowCategories(true);
    setSearchParams({});
  };

  const goBackToCategories = () => {
    setShowCategories(true);
    setSelectedCategory('all');
    setSearchTerm('');
    setSearchParams({});
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <BagLoader size="large" text="Loading products..." />
      </div>
    );
  }

  // Show categories view
  if (showCategories && !searchTerm) {
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
                Shop by Category
              </h1>
              <p className="text-xl text-orange-100 max-w-3xl mx-auto">
                Discover our curated collections of premium candles, each crafted with care and attention to detail
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-8 bg-white shadow-sm">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for specific candles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 text-lg"
              />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoriesWithCounts.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer"
                  onClick={() => handleCategorySelect(category.name)}
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
                        {category.count} products
                      </span>
                      <span className="text-orange-500 font-medium group-hover:text-orange-600 transition-colors duration-300">
                        Explore →
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show products view
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory !== 'all' ? 
                selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 
                'All Products'
              }
            </h1>
            <p className="text-lg text-gray-600">
              {searchTerm ? `Search results for "${searchTerm}"` : 'Discover our premium candle collection'}
            </p>
          </div>
          <button
            onClick={goBackToCategories}
            className="hidden md:flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
          >
            ← Back to Categories
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.name} value={category.name.toLowerCase()}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Back to Categories - Mobile */}
        <div className="md:hidden mb-6">
          <button
            onClick={goBackToCategories}
            className="flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors duration-200"
          >
            ← Back to Categories
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={clearFilters}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
