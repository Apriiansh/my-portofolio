'use client';

import { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import { ThemeProvider } from './components/ThemeProvider';
import AbstractBackground from './components/AbstractBackgrounds';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

const sections = ["Home", "About", "Projects", "Contact"];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeSection = sections[activeIndex];

  const handleSectionChange = useCallback((index: number) => {
    if (index === activeIndex || isTransitioning || index < 0 || index >= sections.length) return;

    setIsTransitioning(true);
    setActiveIndex(index);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match this with transition duration
  }, [activeIndex, isTransitioning]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isTransitioning) return;

      if (event.deltaY > 0) { // Scrolling down
        handleSectionChange(activeIndex + 1);
      } else { // Scrolling up
        handleSectionChange(activeIndex - 1);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeIndex, isTransitioning, handleSectionChange]);

  const scrollToNextSection = () => {
    handleSectionChange(activeIndex + 1);
  };

  const navSectionChange = (section: string) => {
    const index = sections.indexOf(section);
    if (index !== -1) {
        handleSectionChange(index);
    }
  }

  return (
    <ThemeProvider>
      <main className="relative h-screen overflow-hidden">
        <Navigation
          activeSection={activeSection}
          onSectionChange={navSectionChange}
        />

        <div
          className="w-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
        >
            <section id="home" className="h-screen w-full relative">
              <AbstractBackground type="home" isActive={activeSection === "Home"} />
              <div className="relative z-10">
                <HomeSection onScrollToNext={scrollToNextSection} />
              </div>
            </section>

            <section id="about" className="h-screen w-full relative">
              <AbstractBackground type="about" isActive={activeSection === "About"} />
              <div className="relative z-10">
                <AboutSection />
              </div>
            </section>

            <section id="projects" className="h-screen w-full relative">
              <AbstractBackground type="projects" isActive={activeSection === "Projects"} />
              <div className="relative z-10 h-full flex items-center">
                <ProjectsSection />
              </div>
            </section>

            <section id="contact" className="h-screen w-full relative">
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