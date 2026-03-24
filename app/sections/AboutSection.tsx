'use client';

import { Code, Wrench, Database, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  const skills = [
    {
      icon: Code,
      name: 'Development',
      items: ['PHP (CI4, Laravel)', 'Next.js', 'React Native', 'HTML5, CSS3, TailwindCSS']
    },
    {
      icon: Wrench,
      name: 'IT Support',
      items: ['Hardware Troubleshooting', 'Network (Mikrotik, LAN)', 'OS Installation', 'CCTV / IP Camera']
    },
    {
      icon: Database,
      name: 'Database & Tools',
      items: ['MySQL, PostgreSQL', 'Git / GitHub', 'VS Code','Antigravity', 'WinBox']
    },
    {
      icon: Award,
      name: 'Certifications',
      items: ['Junior Mobile Programming', 'Next.js Fundamental', 'Git & GitHub']
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeUp} className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
            About Me
          </h2>
        </motion.div>

        {/* Profile + Bio */}
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-8">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 glass rounded-lg overflow-hidden">
              <Image
                src="/my.jpg"
                alt="Muhammad Apriyansah"
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--foreground)]">Muhammad Apriyansah</h3>
            <p className="text-[10px] font-mono text-[var(--accent)] tracking-widest uppercase">
              Web Developer &bull; IT Support
            </p>
            <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed max-w-lg">
              D3 Informatics Management graduate (GPA 3.65) with a focus on building reliable web and mobile applications. 
              Proficient in CodeIgniter 4 and Next.js, with solid experience in database design and system administration. 
              Skilled in delivering end-to-end development projects and providing hands-on IT support including hardware troubleshooting 
              and network configuration.
            </p>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div variants={fadeUp}>
          <h3 className="text-[10px] font-mono text-[var(--accent)] tracking-widest uppercase mb-3">Skills & Tools</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                className="glass rounded-md p-3 group"
              >
                <skill.icon className="w-4 h-4 text-[var(--accent)] mb-1.5 group-hover:text-[var(--accent-secondary)] transition-colors duration-200" />
                <h4 className="text-[11px] font-semibold text-[var(--foreground)] mb-1">{skill.name}</h4>
                <ul className="space-y-0.5">
                  {skill.items.map((item, i) => (
                    <li key={i} className="text-[10px] text-[var(--foreground-secondary)] leading-relaxed">{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
