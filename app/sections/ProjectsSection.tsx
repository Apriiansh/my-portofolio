'use client';

import { ExternalLink, Github } from 'lucide-react';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'Attendance',
      description:
        'A mobile attendance application with GPS-based check-in and check-out features to track internship participants in real-time.',
      tech: ['Kotlin', 'Firebase', 'GPS', 'Android Studio'],
      type: 'github',
      link: 'https://github.com/Apriiansh/absensi',
    },
    {
      title: 'CrChive',
      description:
        'A web-based archival management system with OCR technology to support digital archiving, classification, and retention schedules.',
      tech: ['Next.js', 'Tailwind CSS', 'Supabase', 'Tesseract OCR'],
      type: 'github',
      link: 'https://github.com/Apriiansh/ocr-arsip',
    },
    {
      title: 'Chemical Engineering Information System',
      description:
        'An academic information website for the Chemical Engineering Department of Polsri with CMS features.',
      tech: ['Next.Js', 'Tailwind CSS', 'Supabase'],
      type: 'website',
      link: 'https://teknikkimia.polsri.ac.id/',
    },
    {
      title: 'SPI Polsri',
      description:
        'The official website of the Satuan Pengawasan Internal (SPI) of Polsri to support reports, and internal supervision information.',
      tech: ['PHP', 'MySQL', 'Tailwind CSS'],
      type: 'website',
      link: 'https://spi.polsri.ac.id/',
    },
  ];

  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 pb-2 gradient-text">
            Projects
          </h2>
          <div className="max-w-3xl mx-auto px-4">
            <p className="text-base sm:text-lg text-[var(--foreground-secondary)]">
              Here are some of the projects I have worked on, showcasing my experience in mobile applications, information systems, and digital archiving.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full">
          {projects.map((project, index) => (
            <div
              key={index}
              className="glass rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl group"
            >
              
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-[var(--foreground)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--accent)] group-hover:to-[var(--accent-secondary)] transition-all duration-300 leading-tight">
                  {project.title}
                </h3>

                <p className="text-[var(--foreground-secondary)] mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 text-xs glass rounded-full text-[var(--foreground-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex">
                  {project.type === 'github' ? (
                    <a
                      href={project.link}
                      target="_blank"
                      className="flex items-center justify-center gap-2 px-4 py-2 glass rounded-full text-xs hover:bg-white/20 transition-all duration-300 text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                    >
                      <Github className="w-3 h-3" />
                      Code
                    </a>
                  ) : (
                    <a
                      href={project.link}
                      target="_blank"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-full text-xs hover:opacity-90 transition-all duration-300 text-[var(--foreground)]"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Visit
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
