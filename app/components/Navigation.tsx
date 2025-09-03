'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

const sections = ["Home", "About", "Projects", "Contact"];

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const { theme, toggleTheme, isMounted } = useTheme();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 p-2">
      <div className="flex items-center gap-3">
        {/* Navigation Menu */}
        <ul className="flex items-center gap-1 card rounded-full p-1.5">
          {sections.map((section) => (
            <li key={section}>
              <button
                onClick={() => onSectionChange(section)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeSection === section
                    ? "bg-[var(--accent)] text-white shadow-md"
                    : "text-[rgb(var(--foreground-secondary-rgb))] hover:bg-[rgba(var(--foreground-rgb),0.05)] hover:text-[rgb(var(--foreground-rgb))]"
                }`}>
                {section}
              </button>
            </li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          disabled={!isMounted}
          className="card rounded-full p-2.5 hover:bg-[rgba(var(--foreground-rgb),0.05)] transition-all duration-300 group disabled:opacity-50"
        >
          {isMounted ? (
            theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-[var(--accent)] group-hover:rotate-12 transition-transform duration-300" />
            )
          ) : (
            <div className="w-5 h-5" /> // Placeholder for initial render
          )}
        </button>
      </div>
    </nav>
  );
}
