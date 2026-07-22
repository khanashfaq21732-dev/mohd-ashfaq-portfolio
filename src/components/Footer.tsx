'use client';

import React from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-zinc-200 bg-white/60">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-500">
        <div>
          <span className="font-bold text-zinc-900">Mohd. Ashfaq Khan</span> — Software Engineer Undergrad & Agri-Tech Innovator
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/khanashfaq21732-dev" target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors">
            GitHub
          </a>
          <span>•</span>
          <a href="mailto:khanashfaq21732@gmail.com" className="hover:text-cyan-600 transition-colors">
            Email
          </a>
        </div>

        <div>
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
