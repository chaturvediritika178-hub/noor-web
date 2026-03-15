import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Intro from './components/Intro';
import Home from './components/Home';
import Work from './components/Work';
import Team from './components/Team';
import Contact from './components/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);
  return null;
};

export default function App() {
  const [introFinished, setIntroFinished] = useState(() => {
    // If we're on the home page root, ALWAYS show intro
    // If we're navigating directly to any other page, skip intro
    return window.location.pathname !== '/';
  });

  useEffect(() => {
    // Disable scroll during intro
    if (!introFinished) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
      window.scrollTo(0, 0); // Ensure we start at top after intro
    }
  }, [introFinished]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#FDFCFB] text-black selection:bg-black selection:text-white relative">
        {!introFinished && (
          <Intro onComplete={() => {
            setIntroFinished(true);
            sessionStorage.setItem('introPlayed', 'true');
          }} />
        )}
        
        {introFinished && (
          <div className="relative z-10">
            <Header />
            <ScrollIndicator />
            <div className="min-h-screen"> 
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <Footer />
          </div>
        )}
      </div>
    </Router>
  );
}
