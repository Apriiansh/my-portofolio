'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleSectionChange = useCallback((index: number) => {
    if (index === activeIndex || isTransitioning || index < 0 || index >= sections.length) return;

    setIsTransitioning(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with transition duration
  }, [activeIndex, isTransitioning]);

  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (event: WheelEvent) => {
      if (isTransitioning) return;
      if (event.deltaY > 0) {
        handleSectionChange(activeIndex + 1);
      } else {
        handleSectionChange(activeIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, isTransitioning, handleSectionChange, isMobile]);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const index = sections.findIndex((s) => s.toLowerCase() === sectionId);
            if (index !== -1) {
              setActiveIndex(index);
            }
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

  const navSectionChange = (section: string) => {
    if (isMobile) {
      document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const index = sections.indexOf(section);
      if (index !== -1) {
        handleSectionChange(index);
      }
    }
  };

  const mainClasses = isMobile ? "relative" : "relative h-screen overflow-hidden";
  const sectionClasses = isMobile ? "h-auto min-h-screen w-full relative" : "h-screen w-full relative";

  return (
    <ThemeProvider>
      <main className={mainClasses}>
        <Navigation
          activeSection={activeSection}
          onSectionChange={navSectionChange}
        />

        <div
          className={`w-full ${!isMobile ? 'transition-transform duration-1000 ease-in-out' : ''}`}
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
      </main>
    </ThemeProvider>
  );
}