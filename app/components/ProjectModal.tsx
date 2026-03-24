'use client';

import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

export interface Project {
  title: string;
  description: string;
  tech: string[];
  type: 'github' | 'website' | 'both' | 'more';
  link: string;
  githubLink?: string;
  images?: string[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen || !project) return;
    switch (e.key) {
      case 'Escape': onClose(); break;
      case 'ArrowLeft':
        if (project.images && project.images.length > 1)
          setCurrentImageIndex((p) => p === 0 ? project.images!.length - 1 : p - 1);
        break;
      case 'ArrowRight':
        if (project.images && project.images.length > 1)
          setCurrentImageIndex((p) => p === project.images!.length - 1 ? 0 : p + 1);
        break;
    }
  }, [isOpen, project, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!project || !mounted) return null;

  const hasImages = project.images && project.images.length > 0;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass rounded-lg shadow-2xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 p-1.5 glass rounded hover:bg-white/10 transition-colors duration-150"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Images */}
            {hasImages && (
              <div className="relative w-full aspect-video bg-black/30 rounded-t-lg overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={project.images![currentImageIndex]}
                      alt={`${project.title} - ${currentImageIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 90vw, 672px"
                    />
                  </motion.div>
                </AnimatePresence>

                {project.images!.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((p) => p === 0 ? project.images!.length - 1 : p - 1); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 glass rounded hover:bg-white/10 transition-colors duration-150"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((p) => p === project.images!.length - 1 ? 0 : p + 1); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 glass rounded hover:bg-white/10 transition-colors duration-150"
                      aria-label="Next"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {project.images!.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                          className={`h-1.5 rounded-sm transition-all duration-200 ${
                            i === currentImageIndex ? 'bg-white w-4' : 'bg-white/30 w-1.5 hover:bg-white/50'
                          }`}
                          aria-label={`Image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-5 space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-[var(--foreground)]">
                {project.title}
              </h3>

              <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 text-[10px] font-mono glass rounded text-[var(--foreground-secondary)]">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                {(project.type === 'website' || project.type === 'both') && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)] rounded text-xs font-medium hover:brightness-110 transition-all duration-200 text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit
                  </a>
                )}
                {(project.type === 'github' || project.type === 'both') && (
                  <a
                    href={project.type === 'github' ? project.link : project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 glass rounded text-xs font-medium hover:bg-white/10 transition-all duration-200 text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
