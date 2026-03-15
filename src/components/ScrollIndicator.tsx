import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

const ScrollIndicator: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const getNextPage = () => {
    switch (pathname) {
      case '/': return { name: 'Work', path: '/work' };
      case '/work': return { name: 'Team', path: '/team' };
      case '/team': return { name: 'Contact', path: '/contact' };
      case '/contact': return { name: 'Home', path: '/' };
      default: return { name: 'Work', path: '/work' };
    }
  };

  const nextPage = getNextPage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1, ease: "easeOut" }}
      className="fixed bottom-12 right-6 md:bottom-32 md:right-8 z-40 pointer-events-none"
    >
      <Link to={nextPage.path} className="pointer-events-auto group block">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/90 backdrop-blur-2xl text-black px-6 py-3 md:px-8 md:py-4 rounded-full flex items-center space-x-4 md:space-x-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-black/5 relative overflow-hidden"
        >
          {/* Subtle shimmer effect */}
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.02] to-transparent skew-x-12"
          />
          
          <div className="flex flex-col items-start">
            <span className="text-[7px] md:text-[8px] tracking-[0.4em] uppercase opacity-30 font-bold">Scroll Down</span>
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold opacity-60">{nextPage.name}</span>
          </div>
          
          <div className="relative w-5 h-8 md:w-6 md:h-10 border border-black/10 rounded-full flex justify-center pt-1 md:pt-2">
            <motion.div 
              animate={{ y: [0, 10, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1 bg-black/40 rounded-full hidden md:block"
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ScrollIndicator;
