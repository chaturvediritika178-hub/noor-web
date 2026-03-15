import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Pencil } from '../assets/Icons';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const pencilRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    // Audio handling - ensure it stops on complete
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.volume = 0.3;
    audio.loop = true;
    
    const playAudio = async () => {
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.log("Audio autoplay blocked or interrupted");
        }
      }
    };
    
    playAudio();

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            if (isMounted.current) {
              audio.pause();
              audio.currentTime = 0;
              onComplete();
            }
          }
        });
      }
    });

    // Initial state
    gsap.set([taglineRef.current, dotsRef.current], { opacity: 0, visibility: 'visible' });
    gsap.set(pencilRef.current, { opacity: 0, visibility: 'hidden' });
    gsap.set(videoRef.current, { scale: 1 });

    // Stage 1: Logo Fade In (Center)
    tl.fromTo(logoRef.current, 
      { opacity: 0, scale: 0.8, x: '-50%', y: '-50%', left: '50%', top: '50%' },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    );
    
    // Logo Bounce (4 times - up and down)
    tl.to(logoRef.current, {
      y: '-=60', 
      repeat: 7, 
      yoyo: true, 
      duration: 0.25, 
      ease: "power2.inOut"
    });

    tl.to({}, { duration: 0.5 }); // Short pause after bounce

    // Stage 2: Logo moves to Top-Left (Smooth Move)
    tl.to(logoRef.current, {
      left: '60px',
      top: '60px',
      x: '0%',
      scale: 0.4,
      y: 0, // Reset Y from bounce
      duration: 2, 
      ease: "power3.inOut"
    });

    // Stage 3: Video Fade In & Play (4 seconds)
    tl.add(() => {
      if (videoRef.current && isMounted.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        setVideoStarted(true);
        setVideoVisible(true);
      }
    });

    tl.to({}, { duration: 2 }); // Slower fade in wait
    tl.to({}, { duration: 4 }); // Video plays for 4 seconds

    // Stage 4: Video Fade Out
    tl.to(videoRef.current, {
      opacity: 0,
      duration: 1.5,
      onComplete: () => {
        if (isMounted.current) setVideoVisible(false);
      }
    });
    
    tl.to({}, { duration: 1 }); // Cinematic pause

    // Stage 5: Tagline Typewriter Effect with Pencil
    tl.set(taglineRef.current, { opacity: 1, visibility: 'visible' });
    
    const chars1 = taglineRef.current?.querySelectorAll('.line-1 .char');
    const chars2 = taglineRef.current?.querySelectorAll('.line-2 .char');
    
    tl.set([chars1, chars2], { opacity: 0, visibility: 'visible' });

    // Line 1 Typewriter
    if (chars1) {
      tl.set(pencilRef.current, { visibility: 'visible' });
      tl.fromTo(pencilRef.current,
        { opacity: 0, x: -30, y: 0, rotate: -45 },
        { opacity: 1, x: 0, y: 0, rotate: 0, duration: 0.6, ease: "back.out" }
      );

      const syncObj1 = { progress: 0 };
      tl.to(syncObj1, {
        progress: 1,
        duration: 2.5,
        ease: "none",
        onStart: () => {
          const containerWidth = taglineRef.current?.querySelector('.tagline-container')?.getBoundingClientRect().width || 800;
          const textWidth = taglineRef.current?.querySelector('.line-1')?.getBoundingClientRect().width || 400;
          (syncObj1 as any).startX = (containerWidth - textWidth) / 2;
          (syncObj1 as any).textWidth = textWidth;
        },
        onUpdate: () => {
          // Reveal characters based on progress
          const charIndex = Math.floor(syncObj1.progress * (chars1.length - 1));
          const currentChar = chars1[charIndex] as HTMLElement;
          
          if (currentChar) {
            chars1.forEach((char, i) => {
              if (i <= charIndex) gsap.set(char, { opacity: 1, visibility: 'visible' });
            });

            const taglineRect = taglineRef.current?.getBoundingClientRect();
            const charRect = currentChar.getBoundingClientRect();
            
            if (taglineRect && charRect) {
              gsap.set(pencilRef.current, {
                x: charRect.right - taglineRect.left,
                y: charRect.top - taglineRect.top + (charRect.height / 2),
                rotate: Math.sin(syncObj1.progress * 40) * 15
              });
            }
          }
        }
      });
    }

    tl.to(pencilRef.current, { opacity: 0, duration: 0.2 });

    // Line 2 Typewriter
    if (chars2) {
      tl.to(pencilRef.current, {
        x: 0,
        y: 60,
        duration: 0.1
      });
      tl.to(pencilRef.current, { opacity: 1, visibility: 'visible', duration: 0.2 });

      const syncObj2 = { progress: 0 };
      tl.to(syncObj2, {
        progress: 1,
        duration: 2.5,
        ease: "none",
        onStart: () => {
          const containerWidth = taglineRef.current?.querySelector('.tagline-container')?.getBoundingClientRect().width || 800;
          const line1 = taglineRef.current?.querySelector('.line-1');
          const line2 = taglineRef.current?.querySelector('.line-2');
          const textWidth = line2?.getBoundingClientRect().width || 400;
          const line1Rect = line1?.getBoundingClientRect();
          const line2Rect = line2?.getBoundingClientRect();
          
          (syncObj2 as any).startX = (containerWidth - textWidth) / 2;
          (syncObj2 as any).textWidth = textWidth;
          (syncObj2 as any).yOffset = line2Rect && line1Rect ? line2Rect.top - line1Rect.top : 60;
        },
        onUpdate: () => {
          // Reveal characters based on progress
          const charIndex = Math.floor(syncObj2.progress * (chars2.length - 1));
          const currentChar = chars2[charIndex] as HTMLElement;
          
          if (currentChar) {
            chars2.forEach((char, i) => {
              if (i <= charIndex) gsap.set(char, { opacity: 1, visibility: 'visible' });
            });

            const taglineRect = taglineRef.current?.getBoundingClientRect();
            const charRect = currentChar.getBoundingClientRect();
            
            if (taglineRect && charRect) {
              gsap.set(pencilRef.current, {
                x: charRect.right - taglineRect.left,
                y: charRect.top - taglineRect.top + (charRect.height / 2),
                rotate: Math.sin(syncObj2.progress * 40) * 15
              });
            }
          }
        }
      });
    }

    tl.to(pencilRef.current, { opacity: 0, y: 40, duration: 0.5 });
    
    // Stage 6: 3 Dots Vibrating & Pulse
    tl.set(dotsRef.current, { opacity: 1, visibility: 'visible' });
    const dots = dotsRef.current?.querySelectorAll('.dot');
    if (dots) {
      tl.fromTo(dots, 
        { opacity: 0, scale: 0, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.3,
          duration: 1,
          ease: "back.out"
        }
      );
      
      // Finite vibration so timeline can finish
      tl.to(dots, {
        y: "-=8",
        scale: 1.1,
        duration: 0.4,
        repeat: 5, // Finite repeats
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15
      });
    }

    tl.to({}, { duration: 1.5 }); // Final pause before site opens

    return () => {
      isMounted.current = false;
      tl.kill();
      audio.pause();
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [onComplete]);

  const line1Text = "Where Cinema becomes Life";
  const line2Text = "and Life becomes Cinema";

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-[#FDFCFB] overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <video 
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoVisible ? 'opacity-100' : 'opacity-0'}`}
          muted
          playsInline
        >
          <source src="/intro_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Logo - Starts at center, moves to top-left */}
      <div 
        ref={logoRef} 
        className="absolute pointer-events-none z-50"
      >
        <img src="/logo.png" alt="Noorjahan Logo" className="w-40 md:w-64 h-auto" />
      </div>

      {/* Tagline Content - Centered in middle of screen */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center px-6 md:px-10 z-50">
        <div ref={taglineRef} className="flex flex-col items-center space-y-4 md:space-y-8 w-full max-w-4xl">
          <div className="relative tagline-container flex flex-col items-center text-center w-full">
            <div ref={pencilRef} className="absolute left-0 top-0 w-6 h-6 md:w-8 md:h-8 text-black z-10">
              <Pencil className="w-full h-full" />
            </div>
            <div className="tagline-text text-base sm:text-lg md:text-3xl font-light tracking-[0.1em] md:tracking-[0.15em] uppercase italic-quote text-black w-full flex flex-col items-center">
              <span className="line-1 block mb-1 md:mb-2">
                {line1Text.split("").map((char, i) => (
                  <span key={i} className="char inline-block">{char === " " ? "\u00A0" : char}</span>
                ))}
              </span>
              <span className="line-2 block">
                {line2Text.split("").map((char, i) => (
                  <span key={i} className="char inline-block">{char === " " ? "\u00A0" : char}</span>
                ))}
              </span>
            </div>
          </div>
          
          {/* Vibrating Dots */}
          <div ref={dotsRef} className="flex space-x-4 md:space-x-8 pt-2 md:pt-4">
            <div className="dot w-3 h-3 md:w-4 md:h-4 bg-black rounded-full shadow-sm"></div>
            <div className="dot w-3 h-3 md:w-4 md:h-4 bg-black rounded-full shadow-sm"></div>
            <div className="dot w-3 h-3 md:w-4 md:h-4 bg-black rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
