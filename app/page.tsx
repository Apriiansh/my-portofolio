'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navigation from './components/Navigation';
import { ThemeProvider } from './components/ThemeProvider';
import AbstractBackground from './components/AbstractBackgrounds';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

const sections = ["Home", "About", "Projects", "Contact"];
const MOBILE_BREAKPOINT = 768;

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const activeSection = sections[activeIndex];

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleSectionChange = useCallback((index: number) => {
    if (index === activeIndex || isTransitioning || index < 0 || index >= sections.length) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [activeIndex, isTransitioning]);

  // Wheel navigation (desktop)
  useEffect(() => {
    if (isMobile) return;
    const handleWheel = (e: WheelEvent) => {
      if (document.body.classList.contains('modal-open') || isTransitioning) return;
      if (e.deltaY > 0) handleSectionChange(activeIndex + 1);
      else handleSectionChange(activeIndex - 1);
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, isTransitioning, handleSectionChange, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.body.classList.contains('modal-open') || isTransitioning) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        handleSectionChange(activeIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handleSectionChange(activeIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isTransitioning, handleSectionChange, isMobile]);

  // Mobile scroll observer
  useEffect(() => {
    if (!isMobile) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.toLowerCase() === entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [isMobile]);

  const scrollToNextSection = () => {
    if (isMobile) {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleSectionChange(activeIndex + 1);
    }
  };

  const scrollToTop = () => {
    if (isMobile) {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleSectionChange(0);
    }
  };

  const navSectionChange = (section: string) => {
    if (isMobile) {
      document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const index = sections.indexOf(section);
      if (index !== -1) handleSectionChange(index);
    }
  };

  const mainClasses = isMobile ? "relative" : "relative h-screen overflow-hidden";
  const sectionClasses = isMobile ? "h-auto min-h-screen w-full relative" : "h-screen w-full relative";

  return (
    <ThemeProvider>
      <main className={mainClasses}>
        <Navigation activeSection={activeSection} onSectionChange={navSectionChange} />

        <div
          className={`w-full ${!isMobile ? 'transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]' : ''}`}
          style={{ transform: isMobile ? 'none' : `translateY(-${activeIndex * 100}vh)` }}
        >
          <section id="home" ref={(el) => { sectionRefs.current[0] = el; }} className={sectionClasses}>
            <AbstractBackground type="home" isActive={activeSection === "Home"} />
            <div className="relative z-10">
              <HomeSection onScrollToNext={scrollToNextSection} />
            </div>
          </section>

          <section id="about" ref={(el) => { sectionRefs.current[1] = el; }} className={sectionClasses}>
            <AbstractBackground type="about" isActive={activeSection === "About"} />
            <div className="relative z-10">
              <AboutSection />
            </div>
          </section>

          <section id="projects" ref={(el) => { sectionRefs.current[2] = el; }} className={sectionClasses}>
            <AbstractBackground type="projects" isActive={activeSection === "Projects"} />
            <div className="relative z-10 h-full flex items-center">
              <ProjectsSection />
            </div>
          </section>

          <section id="contact" ref={(el) => { sectionRefs.current[3] = el; }} className={sectionClasses}>
            <AbstractBackground type="contact" isActive={activeSection === "Contact"} />
            <div className="relative z-10 h-full flex items-center">
              <ContactSection />
            </div>
          </section>
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {activeIndex > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-50 p-2.5 glass rounded-md hover:bg-white/10 transition-colors duration-150 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-[var(--foreground-secondary)] group-hover:text-[var(--accent)] transition-colors duration-150" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </ThemeProvider>
  );
}