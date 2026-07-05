import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ShoppingBag, CalendarRange, Plus, Minus } from 'lucide-react';

const JUICE_DATA = [
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
      className={`bg-[#f9faf7]/90 border border-white/60 rounded-[40px] p-6 flex flex-col justify-between h-[620px] transition-all duration-300 w-full select-none ${
        isCenter 
          ? 'shadow-[0_30px_60px_rgba(0,0,0,0.15),inset_-4px_-4px_10px_rgba(255,255,255,0.6),4px_4px_12px_rgba(0,0,0,0.06)]' 
          : 'shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.4),2px_2px_8px_rgba(0,0,0,0.04)] border-white/30'
      }`}
    >
      <div>
        {/* Product Image Box */}
        <div className="w-full h-[260px] bg-white rounded-[30px] flex items-center justify-center p-4 relative overflow-hidden shadow-sm">
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
        <h3 className="text-2xl font-black text-gray-900 mt-5 mb-1 text-left">{product.name}</h3>
        <p className="text-gray-500 text-xs font-medium leading-relaxed mb-4 h-10 overflow-hidden line-clamp-2 text-left">
          {product.desc}
        </p>
      </div>

      <div>
        {/* Qty Selector */}
        <div className="flex items-center justify-between border-t border-b border-gray-200/50 py-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Quantity</span>
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white/50">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                decrement();
              }}
              className="px-3 py-1 text-gray-500 hover:bg-gray-200 active:bg-gray-300 transition-colors pointer-events-auto cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-sm font-extrabold text-gray-800 min-w-8 text-center">{quantity}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                increment();
              }}
              className="px-3 py-1 text-gray-500 hover:bg-gray-200 active:bg-gray-300 transition-colors pointer-events-auto cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pricing & Checkout Options */}
        <div className="grid grid-cols-2 gap-3">
          {/* Loose Daily Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(product, quantity, 'Daily');
            }}
            className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm active:scale-95 transition-all text-center group/btn pointer-events-auto cursor-pointer"
          >
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Daily Sale</span>
            <span className="text-sm font-black text-[#6db33f] mb-1.5">₹{product.dailyPrice}</span>
            <span className="flex items-center gap-1 text-[9px] font-extrabold uppercase text-gray-500 group-hover/btn:text-black">
              <ShoppingBag className="w-3 h-3" /> Buy Now
            </span>
          </button>

          {/* Subscription Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) onAddToCart(product, quantity, 'Subscription');
            }}
            className="flex flex-col items-center justify-center py-2.5 px-2 rounded-2xl bg-black hover:bg-[#6db33f] text-white shadow-md active:scale-95 transition-all text-center group/btn pointer-events-auto cursor-pointer"
          >
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Monthly</span>
            <span className="text-sm font-black text-white mb-1.5">₹{product.monthlyPrice}</span>
            <span className="flex items-center gap-1 text-[9px] font-extrabold uppercase text-gray-200">
              <CalendarRange className="w-3 h-3" /> Subscribe
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const LiquidCarousel = ({ onAddToCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  const splashPathRef = useRef(null);
  const autoPlayRef = useRef();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute layout spacing based on screen width
  const offset = screenWidth < 640 ? 200 : screenWidth < 768 ? 240 : screenWidth < 1024 ? 300 : 380;

  // SVG Morphing Paths
  const paths = {
    initial: "M 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100 Z",
    splash: "M 0 100 Q 50 20 100 100 L 100 100 Q 50 100 0 100 Z",
    full: "M 0 100 Q 50 -50 100 100 L 100 0 Q 50 0 0 0 Z",
    reveal: "M 0 0 Q 50 80 100 0 L 100 0 Q 50 0 0 0 Z",
  };

  const triggerTransition = useCallback((nextIndex) => {
    if (isAnimating || nextIndex === activeIndex) return;
    setIsAnimating(true);
    
    const nextColor = JUICE_DATA[nextIndex].color;
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // The Liquid "Splash" Sequence
    tl.to(splashPathRef.current, {
      duration: 0.5,
      attr: { d: paths.splash },
      fill: nextColor,
      ease: "power2.in",
    })
    .to(splashPathRef.current, {
      duration: 0.4,
      attr: { d: paths.full },
      ease: "power4.out",
      onStart: () => setActiveIndex(nextIndex)
    })
    .to(splashPathRef.current, {
      duration: 0.8,
      attr: { d: paths.reveal },
      ease: "power4.inOut",
      delay: 0.1
    })
    .set(splashPathRef.current, { attr: { d: paths.initial }, fill: 'transparent' });
  }, [activeIndex, isAnimating]);

  // Autoplay Logic (4 seconds)
  useEffect(() => {
    if (!isHovered && !isAnimating) {
      autoPlayRef.current = setInterval(() => {
        triggerTransition((activeIndex + 1) % JUICE_DATA.length);
      }, 4000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [activeIndex, isHovered, isAnimating, triggerTransition]);

  const handlePrev = () => triggerTransition((activeIndex - 1 + JUICE_DATA.length) % JUICE_DATA.length);
  const handleNext = () => triggerTransition((activeIndex + 1) % JUICE_DATA.length);

  return (
    <section id="products" className="relative h-screen min-h-[850px] w-full flex items-center justify-center overflow-hidden bg-[#edf7ee] transition-colors duration-1000">
      
      {/* Dynamic Background Glow */}
      <div 
        className="absolute inset-0 opacity-40 transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at center, ${JUICE_DATA[activeIndex].color}, transparent 65%)` }}
      />

      {/* GSAP Liquid Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path ref={splashPathRef} d={paths.initial} fill="transparent" />
      </svg>

      <div 
        className="relative z-10 w-full max-w-7xl px-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex items-center justify-center h-[700px] mt-[40px]">
          {JUICE_DATA.map((juice, index) => {
            const isCenter = index === activeIndex;
            const isLeft = index === (activeIndex - 1 + JUICE_DATA.length) % JUICE_DATA.length;
            const isRight = index === (activeIndex + 1) % JUICE_DATA.length;
            
            if (!isCenter && !isLeft && !isRight) return null;

            return (
              <motion.div
                key={juice.id}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -60) handleNext();
                  else if (info.offset.x > 60) handlePrev();
                }}
                initial={false}
                onClick={() => {
                  if (!isCenter) triggerTransition(index);
                }}
                animate={{
                  x: isCenter ? 0 : isLeft ? -offset : offset,
                  scale: isCenter ? 1.0 : 0.85,
                  y: isCenter ? -20 : 0,
                  opacity: isCenter ? 1.0 : 0.35,
                  rotate: isLeft ? -6 : isRight ? 6 : 0,
                  zIndex: isCenter ? 10 : 1
                }}
                whileHover={!isCenter ? { opacity: 0.6, scale: 0.88 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className={`absolute w-[90vw] max-w-[420px] ${!isCenter ? 'cursor-pointer' : ''}`}
                style={{
                  filter: isCenter ? 'blur(0px)' : 'blur(3px)',
                }}
              >
                <ProductCard product={juice} onAddToCart={onAddToCart} isCenter={isCenter} />
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center mt-12 gap-6">
          <div className="flex items-center gap-12">
            <button onClick={handlePrev} className="text-gray-400 hover:text-black transition-colors text-2xl font-light cursor-pointer">←</button>
            <div className="flex gap-3">
              {JUICE_DATA.map((_, i) => (
                <button
                  key={i}
                  onClick={() => triggerTransition(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === activeIndex ? 'w-10' : 'w-2 bg-gray-200'}`}
                  style={{ backgroundColor: i === activeIndex ? JUICE_DATA[i].color : '' }}
                />
              ))}
            </div>
            <button onClick={handleNext} className="text-gray-400 hover:text-black transition-colors text-2xl font-light cursor-pointer">→</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiquidCarousel;