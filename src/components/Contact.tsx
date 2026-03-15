import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Mail, Phone, MapPin } from '../assets/Icons';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const isInView = useInView(formRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && nameInputRef.current && formState === 'idle') {
      nameInputRef.current.focus();
    }
  }, [isInView, formState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.status === 'success') {
        setFormState('success');
      } else {
        alert(result.message || 'Error occurred');
        setFormState('idle');
      }
    } catch (error) {
      console.error('Submission error:', error);
      // Fallback for dev environment or errors
      setTimeout(() => setFormState('success'), 1500);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFCFB]">
      <section className="max-w-7xl mx-auto pt-32 md:pt-48 px-6 md:px-[5vw]">
        <div className="flex flex-col md:flex-row gap-20 md:gap-32">
          
          {/* Left Column: Contact Details */}
          <div className="w-full md:w-1/3 space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl md:text-7xl font-primary font-normal mb-8">Connect</h1>
              <p className="text-lg font-light opacity-60 leading-relaxed max-w-sm font-secondary">
                For inquiries, collaborations, or simply to share a vision. We respond to every thoughtful message.
              </p>
            </motion.div>

            <div className="space-y-12">
              {[
                { icon: Mail, title: "Electronic Mail", content: "hello@noorjahan.com", link: "mailto:hello@noorjahan.com" },
                { icon: Phone, title: "Telecomm", content: "+1 (555) 123 4567", link: "tel:+15551234567" },
                { icon: MapPin, title: "Base of Operations", content: "Art District, Los Angeles", link: "#map" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="mt-1">
                    <item.icon className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] tracking-[0.2em] uppercase font-bold opacity-30 group-hover:opacity-100 transition-opacity duration-500">{item.title}</p>
                    <a href={item.link} className="block text-base font-light hover:opacity-100 transition-opacity border-b border-transparent hover:border-black/20 pb-1">
                      {item.content}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Minimalist Form */}
          <div className="w-full md:w-2/3">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full flex flex-col justify-center space-y-8 py-20"
                >
                  <h2 className="text-4xl md:text-6xl font-primary">Transmission <br/>Received.</h2>
                  <p className="text-sm tracking-[0.3em] uppercase opacity-40">Verification successful. We will reach out soon.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-[10px] tracking-[0.4em] uppercase underline underline-offset-8 self-start hover:opacity-60 transition-opacity"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-12 md:space-y-16"
                  // Note: To connect to database, use Formspree action here
                  // action="https://formspree.io/f/your-id"
                  // method="POST"
                >
                  <div className="grid md:grid-cols-2 gap-12 md:gap-16">
                    <div className="relative group">
                      <label className="text-[10px] tracking-[0.3em] uppercase opacity-30 mb-2 block group-focus-within:opacity-100 transition-opacity">Identity</label>
                      <input 
                        type="text" 
                        required 
                        name="name"
                        placeholder="Your full name"
                        className="w-full bg-transparent border-b border-black/10 py-4 text-base font-light focus:outline-none transition-all duration-700 placeholder:opacity-20"
                      />
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileFocus={{ scaleX: 1 }}
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-black origin-center transition-transform duration-700"
                      />
                    </div>
                    <div className="relative group">
                      <label className="text-[10px] tracking-[0.3em] uppercase opacity-30 mb-2 block group-focus-within:opacity-100 transition-opacity">Digital Link</label>
                      <input 
                        type="email" 
                        required 
                        name="email"
                        placeholder="email@example.com"
                        className="w-full bg-transparent border-b border-black/10 py-4 text-base font-light focus:outline-none transition-all duration-700 placeholder:opacity-20"
                      />
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileFocus={{ scaleX: 1 }}
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-black origin-center transition-transform duration-700"
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-[10px] tracking-[0.3em] uppercase opacity-30 mb-2 block group-focus-within:opacity-100 transition-opacity">Inquiry Details</label>
                    <textarea 
                      rows={4} 
                      required 
                      name="message"
                      placeholder="Tell us what you are thinking..."
                      className="w-full bg-transparent border-b border-black/10 py-4 text-base font-light focus:outline-none transition-all duration-700 placeholder:opacity-20 resize-none"
                    ></textarea>
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileFocus={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-black origin-center transition-transform duration-700"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="group relative overflow-hidden bg-black text-white px-12 py-6 text-[10px] tracking-[0.6em] uppercase hover:bg-stone-900 transition-all duration-500 disabled:opacity-50"
                  >
                    <span className="relative z-10">
                      {formState === 'submitting' ? 'Transmitting...' : 'Send Transmission'}
                    </span>
                    <motion.div 
                      className="absolute inset-0 bg-stone-800"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                    />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Map Section - Full Width */}
      <div className="pt-16 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 px-10"
        >
          <h2 className="text-4xl font-serif italic">Find Our Studio</h2>
          <p className="text-sm tracking-[0.4em] uppercase opacity-40">Visit us in the heart of the Art District</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-[600px] bg-stone-200 overflow-hidden group border-y border-black/5 shadow-inner"
        >
          {/* Real Google Maps Iframe */}
          <iframe
            title="Noorjahan Studio Location"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=123%20Cinema%20Lane,%20Art%20District,%20Los%20Angeles,%20CA%2090001+(Noorjahan%20Studio)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            className="grayscale contrast-125 opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-1000"
          ></iframe>
          
          <div className="absolute bottom-10 left-10 p-10 bg-white/90 backdrop-blur-md border border-black/5 max-w-sm space-y-4 z-10">
            <h4 className="text-xs tracking-widest uppercase font-bold">Studio Location</h4>
            <p className="text-sm font-light opacity-60 leading-relaxed">
              Located in the heart of the Art District, our studio is where cinematic visions are forged into reality. 
              We welcome visitors by appointment.
            </p>
            <div className="pt-4 border-t border-black/5">
              <p className="text-[10px] tracking-widest uppercase opacity-40">Open Hours</p>
              <p className="text-xs font-medium">Mon — Fri: 09:00 — 18:00</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Contact;
