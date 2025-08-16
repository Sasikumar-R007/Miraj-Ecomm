
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBagIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=120&h=40&fit=crop&auto=format" 
              alt="Miraj Candles" 
              className="h-8 w-auto rounded"
            />
            <span className="text-xl font-bold text-gray-900">Miraj Candles</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-black transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-gray-600 hover:text-black transition-colors duration-200"
            >
              Products
            </Link>
          </div>

          {/* Cart and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-600 hover:text-black transition-colors duration-200"
            >
              <ShoppingBagIcon className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </Link>

            {currentUser ? (
              <div className="flex items-center space-x-2">
                {currentUser.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-black transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/admin/login" 
                className="flex items-center text-gray-600 hover:text-black transition-colors duration-200"
              >
                <UserIcon className="w-6 h-6" />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-4">
              <Link 
                to="/" 
                className="block text-gray-600 hover:text-black transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="block text-gray-600 hover:text-black transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/cart" 
                className="flex items-center text-gray-600 hover:text-black transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBagIcon className="w-5 h-5 mr-2" />
                Cart ({cartItemsCount})
              </Link>
              {currentUser ? (
                <>
                  {currentUser.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="block text-gray-600 hover:text-black transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/admin/login" 
                  className="flex items-center text-gray-600 hover:text-black transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <UserIcon className="w-5 h-5 mr-2" />
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
