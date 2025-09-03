'use client';

import { Code, Smartphone, Globe, FileText, Wrench, Users } from 'lucide-react';

export default function AboutSection() {
  const skills = [
    { icon: Code, name: 'Programming', desc: 'Web & Mobile Development' },
    { icon: FileText, name: 'Office Tools', desc: 'Documents, Spreadsheets, Presentations' },
    { icon: Wrench, name: 'IT Support', desc: 'System setup, troubleshooting, hardware' },
    { icon: Users, name: 'Soft Skills', desc: 'Problem Solving, Collaboration, Adaptability' }
  ];

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold gradient-text">
            About Me
          </h2>
          <p className="text-xl text-[var(--foreground-secondary)] max-w-3xl mx-auto leading-relaxed">
            An adaptable creator with a background in Information Management,
            passionate about technology, design, and building practical solutions
            — from web & mobile apps to IT support and team collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-60 h-60 glass rounded-3xl flex items-center justify-center">
                <div className="w-50 h-50 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] rounded-2xl flex items-center justify-center">
                  <span className="text-6xl font-bold text-[var(--foreground)]">M</span>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent-secondary)]/20 rounded-3xl blur-xl -z-10"></div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold gradient-text">Muhammad Apriyansah</h3>
            <div className="space-y-4 text-[var(--foreground-secondary)]">
              <p>
                A multi-skilled professional who enjoys exploring different areas of technology
                and problem-solving. Not limited to software engineering, I work across
                development, IT support, and digital workflows.
              </p>
              <p>
                I believe in continuous learning and adaptability — bringing value whether
                it’s coding applications, supporting systems, or collaborating within teams.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <skill.icon className="w-12 h-12 text-[var(--accent)] mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-[var(--foreground)]">
                {skill.name}
              </h4>
              <p className="text-[var(--foreground-secondary)]">{skill.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
