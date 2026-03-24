'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import ProjectModal, { type Project } from '../components/ProjectModal';

const projects: Project[] = [
  {
    title: 'Attendance',
    description:
      'Mobile attendance app with GPS-based check-in/out for real-time tracking of internship participants.',
    tech: ['Kotlin', 'Firebase', 'GPS', 'Android Studio'],
    type: 'github',
    link: 'https://github.com/Apriiansh/absensi',
    images: [
      '/img/attendance/1.png',
      '/img/attendance/2.png',
      '/img/attendance/3.png',
      '/img/attendance/4.png',
    ],
  },
  {
    title: 'CrChive',
    description:
      'Archive management system with OCR technology for digital archiving, classification, and retention scheduling.',
    tech: ['Next.js', 'Supabase', 'Tesseract OCR'],
    type: 'both',
    link: 'https://ocr-arsip.vercel.app/sign-in',
    githubLink: 'https://github.com/Apriiansh/ocr-arsip',
    images: [
      '/img/crchive/1.png',
      '/img/crchive/2.png',
      '/img/crchive/3.png',
    ],
  },
  {
    title: 'Teknik Kimia POLSRI',
    description:
      'Academic information website & CMS for Chemical Engineering Dept of Politeknik Negeri Sriwijaya.',
    tech: ['Next.js', 'TypeScript', 'Supabase'],
    type: 'both',
    link: 'https://teknikkimia.polsri.ac.id/',
    githubLink: 'https://github.com/Apriiansh/teknik-kimia-polsri',
    images: [
      '/img/tekkim/1.png',
      '/img/tekkim/2.png',
      '/img/tekkim/3.png',
      '/img/tekkim/4.png',
      '/img/tekkim/5.png',
    ],
  },
  {
    title: 'SPI POLSRI',
    description:
      'Official SPI website supporting internal whistleblowing, reports, and real-time supervision info.',
    tech: ['CodeIgniter4', 'PHP', 'MySQL', 'Tailwind CSS'],
    type: 'both',
    link: 'https://spi.polsri.ac.id/',
    githubLink: 'https://github.com/Apriiansh/spi-polsri',
    images: [
      '/img/spi/1.png',
      '/img/spi/2.png',
      '/img/spi/3.png',
      '/img/spi/4.png',
      '/img/spi/5.png',
      '/img/spi/6.png',
      '/img/spi/7.png',
    ],
  },
  {
    title: 'POLSRIPAY',
    description:
      'Payment honorarium for lecturers and employees of Politeknik Negeri Sriwijaya.',
    tech: ['CodeIgniter4', 'PHP', 'MySQL'],
    type: 'both',
    link: 'https://polsripay.polsri.ac.id/',
    githubLink: 'https://github.com/Apriiansh/polsripay',
    images: [
      '/img/polsripay/1.png',
      '/img/polsripay/2.png',
    ],
  },
  {
    title: 'PELAKOR (Pelaporan Aset Kantor)',
    description:
      'Full-stack asset & inventory reporting system for Setda Ogan Ilir with mobile and web integration.',
    tech: ['React Native', 'Express.js', 'PostgreSQL'],
    type: 'both',
    link: 'https://pelakor.oganilirkab.go.id/',
    githubLink: 'https://github.com/Apriiansh/pelakor-app',
    images: [
      '/img/pelakor/1.png',
      '/img/pelakor/2.png',
      '/img/pelakor/3.png',
      '/img/pelakor/4.png',
      '/img/pelakor/5.png',
    ],
  },
  // {
  //   title: 'More Projects',
  //   description:
  //     'Various freelance projects: software development, PC building, system installation, troubleshooting.',
  //   tech: ['Development', 'IT Support'],
  //   type: 'more',
  //   link: '#',
  // },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    if (project.type === 'more') return;
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.08 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" as const }
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center py-8">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
              Projects
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => openModal(project)}
                className={`glass rounded-md overflow-hidden transition-all duration-200 group ${
                  project.type !== 'more' ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-sm md:text-base font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-200 leading-tight flex-1">
                      {project.title}
                    </h3>
                    {project.type !== 'more' && (
                      <Eye className="w-3.5 h-3.5 text-[var(--foreground-secondary)] opacity-0 group-hover:opacity-50 transition-opacity duration-200 mt-0.5 ml-2 flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-[var(--foreground-secondary)] mb-3 leading-relaxed text-xs line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono glass rounded text-[var(--foreground-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.type === 'github' ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 glass rounded text-[10px] font-medium hover:bg-white/10 transition-all duration-200 text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                      >
                        <Github className="w-3 h-3" />
                        Code
                      </a>
                    ) : project.type === 'both' ? (
                      <>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent)] rounded text-[10px] font-medium hover:brightness-110 transition-all duration-200 text-white"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Visit
                        </a>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3 py-1.5 glass rounded text-[10px] font-medium hover:bg-white/10 transition-all duration-200 text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                        >
                          <Github className="w-3 h-3" />
                          Code
                        </a>
                      </>
                    ) : (
                      <div className="px-3 py-1.5 glass rounded text-[10px] text-[var(--foreground-secondary)]">
                        Various
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
