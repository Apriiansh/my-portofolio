'use client';

import React from 'react';
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

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-8 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-[var(--foreground-secondary)] max-w-3xl mx-auto">
            Feel free to reach out for collaborations or just to say hi!
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-8 max-w-md mx-auto">
          
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">Contact Info</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-3 glass rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    {React.createElement(info.icon, { className: "w-5 h-5 text-[var(--accent)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300" } as any)}
                    <div>
                      <p className="text-sm text-[var(--foreground-secondary)]">{info.label}</p>
                      <p className="text-[var(--foreground)] font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-3 glass rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110 group"
                  >
                    {React.createElement(social.icon, { className: "w-5 h-5 text-[var(--foreground-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300" } as any)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
