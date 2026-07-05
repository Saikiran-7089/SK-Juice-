import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';

const Navbar = ({ cartCount = 0, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Transparent vs Glassmorphic background
      setScrolled(currentScrollY > 50);

      // Hide/Show based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true); // Scrolling down past threshold -> hide
      } else {
        setHidden(false); // Scrolling up -> show
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Observer for Active Section Highlighting
  useEffect(() => {
    const handleActiveSection = () => {
      const sections = ['home', 'products', 'wellness', 'reviews'];
      let currentActive = 'home';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if the section top occupies viewport space
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
            currentActive = section;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleActiveSection, { passive: true });
    // Run initially with a small delay to let frames render
    const timer = setTimeout(handleActiveSection, 150);

    return () => {
      window.removeEventListener('scroll', handleActiveSection);
      clearTimeout(timer);
    };
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[1000] navbar transition-all duration-500 border-b ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm border-white/20' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div 
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${scrolled ? 'bg-[#6db33f] text-white' : 'bg-[#1d1d1f] text-white'}`}>
              <span className="font-bold text-sm">SK</span>
            </div>
            <span className={`text-xl font-black tracking-tight transition-colors duration-500 ${scrolled ? 'text-gray-900' : 'text-[#1d1d1f]'}`}>
              SK Juice Center.
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Products', 'Wellness', 'Reviews'].map((link) => {
              const id = link.toLowerCase();
              const isActive = activeSection === id;
              return (
                <a 
                  key={link} 
                  href={`#${id}`}
                  onClick={(e) => handleLinkClick(e, id)}
                  className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 relative py-2 group ${
                    isActive ? 'text-black' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {link}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#6db33f] transition-all duration-300 ${
                    isActive 
                      ? 'scale-x-100 opacity-100' 
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  } origin-left`} />
                </a>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => handleLinkClick(e, 'products')}
              className="hidden md:flex items-center justify-center bg-[#1d1d1f] text-white hover:bg-[#6db33f] hover:text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-md cursor-pointer"
            >
              Shop Now
            </button>

            {/* Cart Button */}
            <button 
              onClick={onOpenCart} 
              className="relative p-2 rounded-full hover:bg-gray-100/50 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className={`w-5 h-5 transition-colors duration-500 ${scrolled ? 'text-gray-900' : 'text-[#1d1d1f]'}`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6db33f] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none cursor-pointer z-50"
              aria-label="Toggle Menu"
            >
              <span className={`block w-6 h-[2px] transition-all duration-300 bg-[#1d1d1f] ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
              <span className={`block h-[2px] transition-all duration-300 bg-[#1d1d1f] ${mobileMenuOpen ? 'w-0 opacity-0' : 'w-4'}`}></span>
              <span className={`block w-6 h-[2px] transition-all duration-300 bg-[#1d1d1f] ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-[70px] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg z-[999] flex flex-col md:hidden py-6 px-8 gap-5 animate-slide-up"
        >
          {['Home', 'Products', 'Wellness', 'Reviews'].map((link) => {
            const id = link.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a
                key={link}
                href={`#${id}`}
                onClick={(e) => handleLinkClick(e, id)}
                className={`text-base font-extrabold uppercase tracking-widest py-3 border-b border-gray-100 transition-colors duration-200 ${
                  isActive ? 'text-[#6db33f]' : 'text-gray-600'
                }`}
              >
                {link}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Navbar;
