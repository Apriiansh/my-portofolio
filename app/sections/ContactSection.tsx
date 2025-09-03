'use client';

import { Mail, Phone, MapPin, Github, Linkedin, Globe, Instagram, Facebook } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'apriansyahmlp@gmail.com', href: 'mailto:apriansyahmlp@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+62 822 7951 2377', href: 'tel:+6282279512377' },
    { icon: MapPin, label: 'Location', value: 'Palembang, Indonesia', href: '#' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Apriiansh', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-apriyansah-298a251a2', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/apriansh_27', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/aprii.ansh', label: 'Fesnuk' }
  ];

  return (
    <div className="w-full flex items-center justify-center py-8 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-[var(--foreground-secondary)] max-w-3xl mx-auto">
            Looking for a Employee? Hire me please.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 w-full">
          {/* Contact Form */}
          <div className="glass rounded-3xl p-6">
            <h3 className="text-xl font-bold mb-4 text-[var(--foreground)]">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-secondary)] mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-xl text-[var(--foreground)] placeholder-[var(--foreground-secondary)] placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-secondary)] mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-xl text-[var(--foreground)] placeholder-[var(--foreground-secondary)] placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground-secondary)] mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 glass rounded-xl text-[var(--foreground)] placeholder-[var(--foreground-secondary)] placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>

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
                    <info.icon className="w-5 h-5 text-[var(--accent)] group-hover:text-[var(--accent-secondary)] transition-colors duration-300" />
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
                    <social.icon className="w-5 h-5 text-[var(--foreground-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300" />
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
