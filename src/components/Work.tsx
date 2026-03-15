import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Work: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(5);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstVideoRef = useRef<HTMLElement>(null);

  const videos = [
    // TO CHANGE: Replace these YouTube IDs and Titles with your actual works
    { id: 'dQw4w9WgXcQ', title: 'Cinematic Narrative I' },
    { id: '9bZkp7q19f0', title: 'Visual Poetry' },
    { id: 'L_jWHffIx5E', title: 'The Modern Frame' },
    { id: 'kJQP7kiw5Fk', title: 'Light & Shadow' },
    { id: 'JGwWNGJdvx8', title: 'Ethereal Journeys' },
    { id: 'V-_O7nl0Ii0', title: 'The Director\'s Cut' },
    { id: '8_45_E_0_8', title: 'Urban Echoes' },
    { id: '9_45_E_0_9', title: 'Nature\'s Whisper' },
    { id: 'dQw4w9WgXcQ', title: 'Cinematic Narrative II' },
    { id: '9bZkp7q19f0', title: 'Visual Poetry II' },
    { id: 'L_jWHffIx5E', title: 'The Modern Frame II' },
    { id: 'kJQP7kiw5Fk', title: 'Light & Shadow II' },
  ];

  useEffect(() => {
    // Auto-scroll to first video after text animation
    const timer = setTimeout(() => {
      if (firstVideoRef.current) {
        firstVideoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 5, videos.length));
  };

  return (
    <main className="bg-[#FDFCFB] h-screen overflow-hidden">
      <div className="snap-y snap-mandatory h-full overflow-y-auto scroll-smooth" ref={containerRef}>
        {/* Content sections start here */}

        {/* Video Sections */}
        {videos.slice(0, visibleCount).map((video, index) => (
          <section 
            key={video.id + index} 
            ref={index === 0 ? firstVideoRef : null}
            className="snap-start min-h-screen w-full flex flex-col items-center justify-center px-[5vw] py-20 md:py-32 scroll-mt-20"
          >
            {index === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-full max-w-7xl mb-12 md:mb-20 self-start"
              >
                <h1 className="text-4xl md:text-7xl font-primary mb-4">Selected Works</h1>
                <div className="w-20 h-[1px] bg-black opacity-30"></div>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-10%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full max-w-7xl aspect-video bg-black overflow-hidden shadow-2xl group rounded-sm"
            >
              <iframe 
                className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-1000"
                src={`https://www.youtube.com/embed/${video.id}?autoplay=0&mute=1&controls=1&rel=0`} 
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/60 mb-1 block">Project {index + 1}</span>
                <h2 className="text-xl font-serif italic text-white">{video.title}</h2>
              </div>
            </motion.div>
          </section>
        ))}

        {/* Load More Section */}
        {visibleCount < videos.length && (
          <section className="snap-start h-screen flex items-center justify-center py-10">
            <button 
              onClick={handleLoadMore}
              className="group relative px-12 py-5 border border-black/10 overflow-hidden transition-all duration-500 hover:border-black"
            >
              <span className="relative z-10 text-[10px] tracking-[0.6em] uppercase group-hover:text-white transition-colors duration-500">
                Load More
              </span>
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </section>
        )}
      </div>
    </main>
  );
};

export default Work;
