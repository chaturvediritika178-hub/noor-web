import React from 'react';
import { motion } from 'motion/react';

const Team: React.FC = () => {
  const members = [
    {
      name: "Noorjahan", // TO CHANGE: Founder Name
      role: "Founder & Creative Director", // TO CHANGE: Founder Role
      bio: "With over two decades of experience in visual storytelling, Noorjahan leads the creative vision of the agency, ensuring every frame resonates with life.", // TO CHANGE: Founder Bio
      image: "https://picsum.photos/seed/ceo/800/1000", // TO CHANGE: Founder Photo (e.g., "/assets/team/noorjahan.jpg")
      align: "left"
    },
    {
      name: "Julian Vane", // TO CHANGE: Member Name
      role: "Head of Cinematography", // TO CHANGE: Member Role
      bio: "Julian's mastery of light and shadow has defined the aesthetic of numerous award-winning films. He believes that every shot should be a painting.", // TO CHANGE: Member Bio
      image: "https://picsum.photos/seed/cino/800/1000", // TO CHANGE: Member Photo
      align: "right"
    },
    {
      name: "Elena Rossi", // TO CHANGE: Member Name
      role: "Lead Editor", // TO CHANGE: Member Role
      bio: "Elena finds the rhythm in the chaos. Her surgical precision in the edit suite is what gives our films their unique emotional pulse.", // TO CHANGE: Member Bio
      image: "https://picsum.photos/seed/editor/800/1000", // TO CHANGE: Member Photo
      align: "left"
    },
    {
      name: "Marcus Thorne", // TO CHANGE: Member Name
      role: "Production Designer", // TO CHANGE: Member Role
      bio: "Marcus builds worlds. His attention to detail in set design creates the immersive environments that our stories inhabit.", // TO CHANGE: Member Bio
      image: "https://picsum.photos/seed/designer/800/1000", // TO CHANGE: Member Photo
      align: "right"
    }
  ];

  return (
    <main className="h-screen w-full bg-[#FDFCFB] overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {members.map((member, index) => (
        <section 
          key={member.name}
          className="h-screen w-full flex flex-col md:flex-row items-center justify-center snap-start px-6 md:px-20 py-20 overflow-hidden relative"
        >
          <div className={`w-full max-w-7xl flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-24 h-full`}>
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-1/2 h-3/5 md:h-full flex items-center justify-center group cursor-crosshair"
            >
              <div className="relative w-full h-full max-h-[75vh] aspect-[4/5] md:aspect-auto overflow-hidden rounded-sm shadow-2xl">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-[3000ms] ease-out group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-1000"></div>
              </div>
            </motion.div>

            {/* Text Section */}
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? 80 : -80, y: 40 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="w-full md:w-1/2 space-y-6 md:space-y-10"
            >
              <div className="space-y-3 md:space-y-4">
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 0.5, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-xs md:text-sm tracking-[0.4em] uppercase font-secondary font-bold opacity-60"
                >
                  {member.role}
                </motion.h3>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="text-4xl md:text-7xl font-primary font-normal leading-tight"
                >
                  {member.name}
                </motion.h2>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="max-w-xl"
              >
                <p className="text-lg md:text-2xl font-secondary font-light leading-relaxed opacity-80">
                  {member.bio}
                </p>
              </motion.div>

              {index === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
                >
                  <span className="text-[10px] tracking-widest uppercase opacity-40 font-secondary animate-bounce italic">
                    Scroll to explore the collective
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Team;
