'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HomeSectionProps {
  onScrollToNext: () => void;
}

const roles = [
  "Web Developer",
  "IT Support",
];

export default function HomeSection({ onScrollToNext }: HomeSectionProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2500);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      <motion.div
        className="text-center z-10 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 py-2 gradient-text tracking-tight"
        >
          Apriiansh
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="text-lg md:text-xl text-[var(--foreground-secondary)] mb-6 h-8 flex items-center justify-center"
        >
          <span className="font-mono text-base md:text-lg tracking-wide">
            {displayText}
          </span>
          <span className="typing-cursor" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-[var(--foreground-secondary)] opacity-70 mb-10 max-w-md mx-auto leading-relaxed"
        >
          D3 Informatics Management graduate building web &amp; mobile solutions with modern frameworks.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-3 justify-center items-center"
        >
          <a
            href="/my-cv.pdf"
            download="my-cv.pdf"
            className="group relative px-6 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md transition-all duration-300 hover:brightness-110 overflow-hidden"
          >
            <span className="relative z-10">Download CV</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        <button
          onClick={onScrollToNext}
          className="flex flex-col items-center text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors duration-200 group"
        >
          <span className="text-[10px] mb-1.5 font-mono tracking-widest uppercase opacity-50 group-hover:opacity-80 transition-opacity">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-80 transition-opacity" />
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
}
