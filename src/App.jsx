import React, { useState } from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import FrameScroll from './components/FrameScroll';
import FrameScroll2 from './components/FrameScroll2';
import LiquidCarousel from './components/LiquidCarousel';
import WellnessSection from './components/WellnessSection';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, quantity, type) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.id === product.id && item.type === type
      );

      if (existingItemIndex >= 0) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prev, {
          ...product,
          cartId: Date.now().toString(),
          quantity,
          type,
          price: type === 'Subscription' ? product.monthlyPrice : product.dailyPrice
        }];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => item.cartId === cartId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <ReactLenis root>
      {/* Premium fixed site navigation */}
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="w-full bg-white">
        {/* Hero Section with Scroll-Driven Frame Animation */}
        <FrameScroll />

        {/* Cinematic Liquid Flow Carousel */}
        <LiquidCarousel onAddToCart={addToCart} />

        {/* Second Scroll-Driven Animation Section */}
        <FrameScroll2 />
        
        {/* Wellness Landing Page Hub */}
        <WellnessSection onAddToCart={addToCart} />
      </main>

      {/* Slide-out Cart Drawer */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </ReactLenis>
  );
}

export default App;
