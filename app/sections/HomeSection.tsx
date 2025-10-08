'use client';

import { ChevronDown } from 'lucide-react';

interface HomeSectionProps {
  onScrollToNext: () => void;
}

export default function HomeSection({ onScrollToNext }: HomeSectionProps) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      <div className="text-center z-10 px-4 sm:px-6 lg:px-8">
        {/* Main heading */}
        <h1 className="text-6xl p-2 md:text-8xl font-bold mb-6 gradient-text">
          Muhammad Apriyansah
        </h1>

        <p className="text-xl md:text-2xl text-[var(--foreground-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">
          Informatics Technology (IT)
        </p>

        <p className="text-lg text-[var(--foreground-secondary)] opacity-80 mb-12 max-w-xl mx-auto">
          A versatile creator with a passion for technology, design, and problem-solving —
          turning ideas into impactful digital solutions across web, mobile, and beyond.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/my-cv.pdf"
            download="my-cv.pdf"
            className="px-16 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white font-semibold rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            My CV
          </a>
          
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={onScrollToNext}
          className="flex flex-col items-center text-[var(--foreground-secondary)] hover:text-white transition-colors duration-300"
        >
          <span className="text-sm mb-2">Scroll down</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
