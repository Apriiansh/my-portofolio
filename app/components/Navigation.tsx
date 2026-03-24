'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = ["Home", "About", "Projects", "Contact"];

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const { theme, toggleTheme, isMounted } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleNav = (section: string) => {
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-0.5 glass rounded-md p-1">
            {sections.map((section) => (
              <li key={section}>
                <button
                  onClick={() => handleNav(section)}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded transition-all duration-200 ${
                    activeSection === section
                      ? "text-white"
                      : "text-[rgb(var(--foreground-secondary-rgb))] hover:text-[rgb(var(--foreground-rgb))]"
                  }`}
                >
                  {activeSection === section && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-[var(--accent)] rounded"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{section}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden glass rounded-md p-2 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            disabled={!isMounted}
            className="glass rounded-md p-2 hover:bg-white/5 transition-all duration-200 disabled:opacity-50"
            aria-label="Toggle theme"
          >
            {isMounted ? (
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="w-4 h-4 text-[var(--accent)]" />
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <div className="w-4 h-4" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 w-[80vw] max-w-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="glass rounded-md p-2 space-y-0.5">
                {sections.map((section, i) => (
                  <motion.li
                    key={section}
                    initial={{ x: -12, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.03 + i * 0.04 }}
                  >
                    <button
                      onClick={() => handleNav(section)}
                      className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors duration-150 ${
                        activeSection === section
                          ? "bg-[var(--accent)] text-white"
                          : "text-[var(--foreground-secondary)] hover:bg-white/5 hover:text-[var(--foreground)]"
                      }`}
                    >
                      {section}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
