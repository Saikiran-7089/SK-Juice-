import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, CalendarRange, Plus, Minus } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Watermelon Juice',
    image: '/images/watermelon_juice_1779013775831.png',
    dailyPrice: 60,
    monthlyPrice: 1500,
    color: '#ff4b5c',
    desc: 'Pure, refreshing watermelon juice to keep you hydrated and energized.'
  },
  {
    id: 2,
    name: 'Pineapple Juice',
    image: '/images/pineapple_juice_1779013791241.png',
    dailyPrice: 70,
    monthlyPrice: 1800,
    color: '#ffb830',
    desc: 'Tangy and sweet cold-pressed pineapple juice rich in bromelain.'
  },
  {
    id: 3,
    name: 'Orange Juice',
    image: '/images/orange_juice_1779013807899.png',
    dailyPrice: 80,
    monthlyPrice: 2000,
    color: '#ff7a00',
    desc: '100% freshly squeezed citrus oranges packed with Vitamin C.'
  },
  {
    id: 4,
    name: 'Grape Juice',
    image: '/images/grape_juice_1779013842494.png',
    dailyPrice: 90,
    monthlyPrice: 2200,
    color: '#8b5cf6',
    desc: 'Vibrant, rich black grape juice full of antioxidants and natural sweetness.'
  }
];

const ProductCard = ({ product, onAddToCart, isCenter }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div 
      className={`bg-white/40 backdrop-blur-md border border-white/60 rounded-[40px] p-6 flex flex-col justify-between h-full transition-all duration-300 ${
        isCenter 
          ? 'shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.6),_4px_4px_12px_rgba(0,0,0,0.06),_0_12px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]' 
          : 'shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.4),_2px_2px_8px_rgba(0,0,0,0.04)] border-white/30'
      }`}
    >
      <div>
        {/* Product Image */}
        <div className="relative w-full h-44 flex justify-center mb-6">
          <div 
            className="absolute inset-0 rounded-full scale-75 transition-transform duration-500 opacity-20 blur-md"
            style={{ backgroundColor: product.color }}
          />
          <img 
            src={product.image} 
            alt={product.name} 
            className="relative z-10 object-contain h-full transition-transform duration-500 drop-shadow-juice"
          />
        </div>

        {/* Product Info */}
        <h3 className="text-xl font-black text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-xs font-medium leading-relaxed mb-4 h-10 overflow-hidden line-clamp-2">
          {product.desc}
        </p>
      </div>

      <div>
        {/* Qty Selector */}
        <div className="flex items-center justify-between border-t border-b border-gray-200/50 py-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Quantity</span>
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white/50">
            <motion.button 
              whileHover={isCenter ? { scale: 1.15 } : {}}
              onClick={decrement}
              className="px-3 py-1 text-gray-500 hover:bg-gray-200 active:bg-gray-300 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </motion.button>
            <span className="px-3 text-sm font-extrabold text-gray-800 min-w-8 text-center">{quantity}</span>
            <motion.button 
              whileHover={isCenter ? { scale: 1.15 } : {}}
              onClick={increment}
              className="px-3 py-1 text-gray-500 hover:bg-gray-200 active:bg-gray-300 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Pricing & Checkout Options */}
        <div className="grid grid-cols-2 gap-3">
          {/* Loose Daily Button */}
          <motion.button 
            whileHover={isCenter ? { scale: 1.02, boxShadow: '0 4px 15px rgba(109,179,63,0.15)' } : {}}
            onClick={() => onAddToCart(product, quantity, 'Daily')}
            className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm active:scale-95 transition-all text-center group/btn"
          >
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Daily Sale</span>
            <span className="text-sm font-black text-[#6db33f] mb-1.5">₹{product.dailyPrice}</span>
            <span className="flex items-center gap-1 text-[9px] font-extrabold uppercase text-gray-500 group-hover/btn:text-black">
              <ShoppingBag className="w-3 h-3" /> Buy Now
            </span>
          </motion.button>

          {/* Subscription Button */}
          <motion.button 
            whileHover={isCenter ? { scale: 1.02, boxShadow: '0 4px 15px rgba(109,179,63,0.3)' } : {}}
            onClick={() => onAddToCart(product, quantity, 'Subscription')}
            className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-premium-black hover:bg-[#6db33f] text-white shadow-md active:scale-95 transition-all text-center group/btn"
          >
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Monthly</span>
            <span className="text-sm font-black text-white mb-1.5">₹{product.monthlyPrice}</span>
            <span className="flex items-center gap-1 text-[9px] font-extrabold uppercase text-gray-200">
              <CalendarRange className="w-3 h-3" /> Subscribe
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const WellnessProducts = ({ onAddToCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Resize Listener for Responsive Offsets
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute layout spacing based on screen width
  const offset = screenWidth < 640 ? 230 : screenWidth < 768 ? 260 : screenWidth < 1024 ? 300 : 360;

  // Auto-Slide Timer (4 seconds)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, activeIndex]);

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % PRODUCTS.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  // Math for clean circular loop positions
  const getDiff = (index) => {
    let diff = index - activeIndex;
    if (diff < -PRODUCTS.length / 2) diff += PRODUCTS.length;
    if (diff > PRODUCTS.length / 2) diff -= PRODUCTS.length;
    return diff;
  };

  return (
    <div 
      id="menu" 
      className="w-full max-w-7xl mx-auto pt-24 pb-16 px-6 relative overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Title & Nav Buttons */}
      <div className="flex items-center justify-between border-b border-gray-300 pb-5 mb-12">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#6db33f] mb-1.5 block">Menu</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Our Fresh Flavors</h2>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-black hover:border-black hover:bg-white transition-all shadow-sm active:scale-90"
          >
            ←
          </button>
          <button 
            onClick={handleNext}
            className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-black hover:border-black hover:bg-white transition-all shadow-sm active:scale-90"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full h-[560px] flex items-center justify-center overflow-visible select-none">
        
        {/* Dynamic Background Glow */}
        <div 
          className="absolute w-[350px] h-[350px] rounded-full blur-[90px] opacity-25 pointer-events-none transition-all duration-1000 z-0"
          style={{ 
            backgroundColor: PRODUCTS[activeIndex].color,
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '40%'
          }}
        />

        {/* Cards Stack */}
        <AnimatePresence initial={false}>
          {PRODUCTS.map((prod, index) => {
            const diff = getDiff(index);
            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;

            // Responsive Opacity Calculation
            let targetOpacity = 0;
            if (isCenter) {
              targetOpacity = 1;
            } else if (isLeft || isRight) {
              if (screenWidth >= 1024) {
                targetOpacity = 0.45; // Desktop shows left, center, right (3 cards)
              } else if (screenWidth >= 768) {
                if (isRight) targetOpacity = 0.45; // Tablet shows center & right (2 cards)
              }
            }

            const isVisible = targetOpacity > 0;

            return (
              <motion.div
                key={prod.id}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) handleNext();
                  else if (info.offset.x > 60) handlePrev();
                }}
                initial={false}
                animate={{
                  x: diff * offset,
                  scale: isCenter ? 1.0 : 0.85,
                  y: isCenter ? -20 : 0,
                  opacity: targetOpacity,
                  rotate: isLeft ? 3 : isRight ? -3 : 0,
                  zIndex: isCenter ? 30 : 10,
                }}
                whileHover={isCenter ? { scale: 1.03, y: -28 } : {}}
                transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 1.0 }}
                className={`absolute w-[290px] md:w-[325px] h-[480px] origin-center ${
                  isCenter ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
                } ${!isVisible ? 'pointer-events-none' : ''}`}
                onClick={() => {
                  if (!isCenter) setActiveIndex(index);
                }}
                style={{
                  filter: isCenter ? 'blur(0px)' : 'blur(3px)',
                }}
              >
                <ProductCard product={prod} onAddToCart={onAddToCart} isCenter={isCenter} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-3 mt-8 z-20 relative">
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === activeIndex ? 'w-8 shadow-sm' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            style={{ 
              backgroundColor: i === activeIndex ? PRODUCTS[i].color : '' 
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WellnessProducts;
