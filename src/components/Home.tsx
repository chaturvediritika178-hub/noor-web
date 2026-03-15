import React from 'react';
import { motion } from 'motion/react';
import { Camera, Film, Logo } from '../assets/Icons';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#FDFCFB] flex flex-col items-center pb-16 md:pb-32">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col items-center justify-center px-10 text-center space-y-12 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-6 max-w-5xl w-full flex flex-col items-center"
        >
          <Logo className="w-full max-w-2xl text-black" />
          <p className="text-xs md:text-xl font-light tracking-[0.6em] uppercase opacity-50">
            Cinematic Excellence in Every Frame
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="relative w-full max-w-7xl aspect-video overflow-hidden rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-black group"
        >
          <iframe 
            className="w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ" 
            title="Hero Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          <div className="absolute inset-0 border border-white/10 pointer-events-none"></div>
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="w-full max-w-7xl px-10 mt-16 space-y-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.6em] uppercase opacity-30">Our Expertise</span>
              <h2 className="text-5xl md:text-7xl font-serif italic leading-none">What We Do</h2>
            </div>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">
              We are a full-service film production agency specializing in high-end cinematic storytelling. 
              Our collective of directors, cinematographers, and editors work in harmony to transform 
              visionary concepts into moving legacies.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-8 group">
                <div className="w-16 h-16 border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <Camera className="w-6 h-6 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm tracking-widest uppercase font-bold">Production</h3>
                  <p className="text-sm font-light opacity-50 leading-relaxed">From pre-production planning to on-set execution.</p>
                </div>
              </div>
              <div className="space-y-8 group">
                <div className="w-16 h-16 border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <Film className="w-6 h-6 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm tracking-widest uppercase font-bold">Post-Production</h3>
                  <p className="text-sm font-light opacity-50 leading-relaxed">Expert editing, color grading, and sound design.</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 1.1 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="relative aspect-[4/5] bg-stone-100 overflow-hidden rounded-sm shadow-2xl group"
          >
            <img 
              src="https://picsum.photos/seed/production/800/1000" 
              alt="Production Process" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[3000ms] ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000"></div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full mt-24 px-10 text-center pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-5xl mx-auto space-y-12"
        >
          <Logo className="w-32 mx-auto opacity-10" />
          <motion.blockquote 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-4xl md:text-7xl font-accent italic leading-[1.1] tracking-tight italic-quote"
          >
            "Cinema is a matter of what's in the frame and what's out."
          </motion.blockquote>
          <div className="flex items-center justify-center space-x-6">
            <div className="w-12 h-[1px] bg-black/20"></div>
            <p className="text-xs tracking-[0.6em] uppercase opacity-40">Noorjahan Philosophy</p>
            <div className="w-12 h-[1px] bg-black/20"></div>
          </div>
        </motion.div>
      </section>

    </main>
  );
};

export default Home;
