import React from 'react';
import { Instagram, Youtube, Facebook } from '../assets/Icons';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full px-10 py-8 flex justify-between items-center bg-[#FDFCFB] border-t border-black/5"
    >
      <div className="text-[10px] tracking-[0.3em] uppercase opacity-50">
        Created by Avinash
      </div>
      <div className="flex space-x-6">
        <a href="#" className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity">
          <Instagram />
        </a>
        <a href="#" className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity">
          <Youtube />
        </a>
        <a href="#" className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity">
          <Facebook />
        </a>
      </div>
    </motion.footer>
  );
};

export default Footer;
