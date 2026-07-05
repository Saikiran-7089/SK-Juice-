import React from 'react';

const PartnersAndFooter = () => {
  return (
    <div className="w-full relative mt-10">
      
      {/* Get In Touch Section */}
      <div className="max-w-6xl mx-auto py-20 px-6 text-center border-b border-white/30">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-2 uppercase">
          Get In Touch
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-12 max-w-lg mx-auto font-medium">
          Contact us for orders, subscriptions, and support.
        </p>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Card 1: Phone */}
          <a
            href="tel:+918688915833"
            className="group block bg-white/40 backdrop-blur-md border border-white/60 rounded-[20px] p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Phone</h4>
            <span className="text-[#5a8a3a] font-semibold text-sm group-hover:underline break-all">
              +91 8688915833
            </span>
          </a>

          {/* Card 2: Email */}
          <a
            href="mailto:saikiranguest1@gmail.com"
            className="group block bg-white/40 backdrop-blur-md border border-white/60 rounded-[20px] p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Email</h4>
            <span className="text-blue-600 font-semibold text-sm group-hover:underline break-all">
              saikiranguest1@gmail.com
            </span>
          </a>

          {/* Card 3: WhatsApp */}
          <a
            href="https://wa.me/918688915833"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white/40 backdrop-blur-md border border-white/60 rounded-[20px] p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.785 9.785 0 0 0-6.96-2.885c-5.438 0-9.86 4.37-9.864 9.799-.001 2.012.528 3.977 1.529 5.708l-.993 3.624 3.73-.977zm10.158-7.051c-.265-.133-1.569-.772-1.812-.862-.243-.089-.42-.133-.596.133-.177.265-.685.862-.839 1.039-.155.177-.31.199-.575.066-.265-.133-1.12-.413-2.133-1.317-.788-.702-1.32-1.569-1.475-1.834-.155-.265-.017-.409.116-.541.12-.119.265-.31.398-.465.133-.155.177-.265.265-.443.089-.177.044-.332-.022-.465-.066-.133-.596-1.436-.817-1.967-.215-.518-.432-.447-.596-.456-.153-.008-.33-.008-.508-.008-.177 0-.464.066-.707.332-.243.265-.929.907-.929 2.213s.951 2.568 1.084 2.746c.133.177 1.87 2.854 4.529 4.004.633.274 1.125.437 1.512.56.637.202 1.215.174 1.674.105.511-.077 1.569-.641 1.79-.1261.221-.619.221-1.15.148-1.24-.074-.089-.265-.133-.53-.265z" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">WhatsApp</h4>
            <span className="text-[#5a8a3a] font-semibold text-sm group-hover:underline block mb-4">
              +91 8688915833
            </span>
            <span className="inline-flex items-center justify-center gap-2 bg-[#25D366] group-hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-all shadow-sm">
              Chat on WhatsApp
            </span>
          </a>

          {/* Card 4: Address */}
          <a
            href="https://maps.app.goo.gl/Qb4QjNakVe91ofYH8"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white/40 backdrop-blur-md border border-white/60 rounded-[20px] p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Address</h4>
            <span className="text-red-500 font-semibold text-xs leading-relaxed block group-hover:underline">
              THIRUMALAGIRI, MOTHUKUR ROAD, SURYAPET, Telangana, India
            </span>
          </a>
        </div>

        {/* Social Icons at the bottom of the section */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/60 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white text-gray-700 flex items-center justify-center shadow-sm hover:shadow transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/60 hover:bg-blue-600 hover:text-white text-gray-700 flex items-center justify-center shadow-sm hover:shadow transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://wa.me/918688915833"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/60 hover:bg-[#25D366] hover:text-white text-gray-700 flex items-center justify-center shadow-sm hover:shadow transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.785 9.785 0 0 0-6.96-2.885c-5.438 0-9.86 4.37-9.864 9.799-.001 2.012.528 3.977 1.529 5.708l-.993 3.624 3.73-.977zm10.158-7.051c-.265-.133-1.569-.772-1.812-.862-.243-.089-.42-.133-.596.133-.177.265-.685.862-.839 1.039-.155.177-.31.199-.575.066-.265-.133-1.12-.413-2.133-1.317-.788-.702-1.32-1.569-1.475-1.834-.155-.265-.017-.409.116-.541.12-.119.265-.31.398-.465.133-.155.177-.265.265-.443.089-.177.044-.332-.022-.465-.066-.133-.596-1.436-.817-1.967-.215-.518-.432-.447-.596-.456-.153-.008-.33-.008-.508-.008-.177 0-.464.066-.707.332-.243.265-.929.907-.929 2.213s.951 2.568 1.084 2.746c.133.177 1.87 2.854 4.529 4.004.633.274 1.125.437 1.512.56.637.202 1.215.174 1.674.105.511-.077 1.569-.641 1.79-.1261.221-.619.221-1.15.148-1.24-.074-.089-.265-.133-.53-.265z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="w-full bg-[#cbd5c0]/40 backdrop-blur-sm py-20 px-6 border-t border-white/50">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">
            Subscribe to our newsletter
          </h3>
          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="flex flex-col md:flex-row items-center justify-center gap-4 w-full"
          >
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              required
              className="flex-1 w-full max-w-md bg-white border border-white/60 rounded-full py-4 px-6 outline-none focus:ring-2 focus:ring-[#6db33f] shadow-inner text-sm placeholder-gray-400"
            />
            <button 
              type="submit" 
              className="w-full md:w-auto bg-[#5a8a3a] hover:bg-[#4a7230] text-white font-bold text-sm tracking-wider uppercase py-4 px-10 rounded-full transition-colors shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Simple Footer Links */}
      <div className="w-full py-6 px-8 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-gray-500 bg-[#cbd5c0]/60">
        <span>Liquid Vitality @copyright 2026</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-black transition-colors">Home</a>
          <a href="#" className="hover:text-black transition-colors">About Us</a>
          <a href="#" className="hover:text-black transition-colors">Blog</a>
          <a href="#" className="hover:text-black transition-colors">Contact</a>
        </div>
      </div>

    </div>
  );
};

export default PartnersAndFooter;
