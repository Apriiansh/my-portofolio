'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaPhone, FaMapPin, FaEnvelope } from 'react-icons/fa';

export default function ContactSection() {
  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: 'apriansyahmlp@gmail.com', href: 'mailto:apriansyahmlp@gmail.com' },
    { icon: FaPhone, label: 'Phone', value: '+62 822 7951 2377', href: 'tel:+6282279512377' },
    { icon: FaMapPin, label: 'Location', value: 'Palembang, Indonesia', href: '#' }
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Apriiansh', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/apriiansh27/', label: 'LinkedIn' },
    { icon: FaInstagram, href: 'https://www.instagram.com/apriansh_27', label: 'Instagram' },
    { icon: FaFacebook, href: 'https://www.facebook.com/aprii.ansh', label: 'Facebook' }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-8 px-4">
      <motion.div
        className="max-w-md mx-auto w-full"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={fadeUp} className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2 gradient-text">
            Contact
          </h2>
          <p className="text-xs text-[var(--foreground-secondary)]">
            Open for collaboration and opportunities.
          </p>
        </motion.div>

        <div className="space-y-3">
          <motion.div variants={fadeUp} className="glass rounded-md p-4">
            <div className="space-y-1">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center gap-3 p-2.5 rounded hover:bg-white/5 transition-colors duration-150 group"
                >
                  {React.createElement(info.icon, {
                    className: "w-3.5 h-3.5 text-[var(--accent)] flex-shrink-0"
                  } as any)}
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-[var(--foreground-secondary)] uppercase tracking-wider">{info.label}</p>
                    <p className="text-xs text-[var(--foreground)] font-medium truncate">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="glass rounded-md p-4">
            <h3 className="text-xs font-mono text-[var(--accent)] tracking-widest uppercase mb-3">Social</h3>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                  className="p-2.5 glass rounded hover:bg-white/10 transition-colors duration-150 group"
                  aria-label={social.label}
                >
                  {React.createElement(social.icon, {
                    className: "w-4 h-4 text-[var(--foreground-secondary)] group-hover:text-[var(--accent)] transition-colors duration-150"
                  } as any)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
