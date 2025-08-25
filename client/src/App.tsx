
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { LoadingProvider } from './context/LoadingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import BestSellers from './pages/BestSellers';
import NewArrivals from './pages/NewArrivals';
import TrendingProducts from './pages/TrendingProducts';
import SaleProducts from './pages/SaleProducts';
import FeaturedProducts from './pages/FeaturedProducts';
import GiftProducts from './pages/GiftProducts';
import CandleSubcategories from './pages/CandleSubcategories';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/candles" element={<CandleSubcategories />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/register" element={<UserRegister />} />
                    <Route path="/best-sellers" element={<BestSellers />} />
                    <Route path="/new-arrivals" element={<NewArrivals />} />
                    <Route path="/trending" element={<TrendingProducts />} />
                    <Route path="/sale" element={<SaleProducts />} />
                    <Route path="/featured" element={<FeaturedProducts />} />
                    <Route path="/gifts" element={<GiftProducts />} />
                  </Routes>
                </main>
                <Footer />
                <Toaster position="top-right" />
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
