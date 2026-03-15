import React, { useState, useEffect } from 'react';
import { Logo } from '../assets/Icons';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50 || location.pathname === '/work');
    };
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full px-6 py-2 md:px-10 md:py-3 flex justify-between items-center z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-panel shadow-sm py-2 md:py-2' 
            : 'bg-transparent'
        }`}
      >
        <Link to="/" className="w-20 md:w-28 z-50">
          <Logo className="text-black" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-12 text-[10px] tracking-[0.4em] uppercase font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`relative group hover:opacity-100 transition-opacity ${isActive(link.path) ? 'text-black' : 'text-black/40'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-black transition-transform duration-500 origin-left ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#FDFCFB] flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link 
                  to={link.path}
                  className={`text-2xl font-serif italic ${isActive(link.path) ? 'text-black' : 'text-black/40'}`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 text-[10px] tracking-[0.3em] uppercase opacity-30"
            >
              Noorjahan © 2026
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
