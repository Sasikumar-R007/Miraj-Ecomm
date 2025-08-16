
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">ModernStore</h3>
            <p className="text-gray-400">
              Your one-stop destination for modern, high-quality products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Products
              </Link>
              <Link 
                to="/cart" 
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cart
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <div className="space-y-2">
              <p className="text-gray-400">Email: support@modernstore.com</p>
              <p className="text-gray-400">Phone: (555) 123-4567</p>
              <p className="text-gray-400">Mon-Fri: 9AM-6PM</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-gray-400">
              Subscribe to get updates on new products and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-4 py-2 bg-white text-black rounded-r-lg hover:bg-gray-200 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 ModernStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
