'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowDown, Mail, Briefcase, Download, ExternalLink } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
  onDownloadResume: () => void;
  settings: any;
}

export default function Hero({ onNavigate, onDownloadResume, settings }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  const words = [
    "Full-Stack Web Developer",
    "Computer Science Student",
    "Agri-Tech Hackathon Finalist",
    "Problem Solver in C & Python"
  ];

  // Typing effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 75);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    setTypedText(words[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <section 
      id="hero-section" 
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-24"
    >
      {/* GLOWING BACKGROUND ACCENTS */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[450px] md:h-[450px] rounded-full bg-cyan-200/20 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 md:w-[450px] md:h-[450px] rounded-full bg-pink-200/20 blur-[80px] md:blur-[120px] pointer-events-none animate-pulse" />

      {/* METRIC BADGE */}
      <div 
        id="hero-badge"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-200 bg-cyan-50/50 text-cyan-700 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest mb-6 backdrop-blur-md animate-bounce"
      >
        <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
        Available for Internships & Projects
      </div>

      {/* PORTRAIT IMAGE */}
      <div className="relative mb-6 group select-none">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 to-pink-500 opacity-25 blur-md group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <img
          src="/src/assets/images/user_profile_photo_1784629749234.jpg"
          alt="Mohd. Ashfaq Khan"
          referrerPolicy="no-referrer"
          className="relative w-28 h-36 md:w-32 md:h-40 rounded-2xl object-cover object-top border-2 border-white shadow-md bg-white"
        />
      </div>

      {/* MAIN NAME DISPLAY */}
      <h1 
        id="hero-name"
        className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-zinc-950 font-sans max-w-5xl leading-[1.1] mb-6"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700">
          Mohd. Ashfaq
        </span>
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600">
          Khan
        </span>
      </h1>

      {/* TYPING TYPOGRAPHY */}
      <div className="h-8 md:h-10 mb-8 flex items-center justify-center">
        <p 
          id="hero-typing-text"
          className="text-lg sm:text-xl md:text-2xl font-mono font-semibold text-zinc-700 tracking-tight"
        >
          {typedText}
          <span className="inline-block w-1.5 h-5 bg-cyan-500 ml-1 animate-pulse" />
        </p>
      </div>

      {/* BIOGRAPHY PARAGRAPH */}
      <p 
        id="hero-bio"
        className="text-sm md:text-base text-zinc-600 max-w-2xl leading-relaxed mb-10 font-sans px-2"
      >
        {settings.bio}
      </p>

      {/* CALL TO ACTION BUTTONS */}
      <div id="hero-ctas" className="flex flex-col sm:flex-row items-center gap-4 mb-16 z-10">
        <button
          id="cta-hire-me"
          onClick={() => onNavigate('contact')}
          className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_4px_20px_rgba(6,182,212,0.25)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Mail size={16} />
          Hire Me
        </button>

        <button
          id="cta-view-projects"
          onClick={() => onNavigate('projects')}
          className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm border border-zinc-200/80 bg-white/80 hover:bg-zinc-100 text-zinc-700 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
        >
          <Briefcase size={16} className="text-cyan-600" />
          View Projects
        </button>

        <button
          id="cta-download-resume"
          onClick={onDownloadResume}
          className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm border border-pink-200 bg-pink-50/40 hover:bg-pink-100/55 text-pink-600 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
        >
          <Download size={16} />
          Get CV
        </button>
      </div>

      {/* LUXURIOUS STATS CARD */}
      <div 
        id="hero-stats-card"
        className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl border border-zinc-200/60 bg-white/80 shadow-md z-10"
      >
        <div className="flex flex-col items-center p-3">
          <span className="text-2xl md:text-3xl font-black text-cyan-600 font-sans tracking-tight">Top 15</span>
          <span className="text-[10px] md:text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider mt-1">Hackathon Rank</span>
        </div>
        <div className="flex flex-col items-center p-3 border-l border-zinc-100">
          <span className="text-2xl md:text-3xl font-black text-pink-600 font-sans tracking-tight">30%</span>
          <span className="text-[10px] md:text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider mt-1">Log Efficiency</span>
        </div>
        <div className="flex flex-col items-center p-3 border-l border-zinc-100">
          <span className="text-2xl md:text-3xl font-black text-blue-600 font-sans tracking-tight">15+</span>
          <span className="text-[10px] md:text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider mt-1">Core Techs</span>
        </div>
        <div className="flex flex-col items-center p-3 border-l border-zinc-100">
          <span className="text-2xl md:text-3xl font-black text-emerald-600 font-sans tracking-tight">2027</span>
          <span className="text-[10px] md:text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider mt-1">Grad Year</span>
        </div>
      </div>

      {/* FLOATING SCROLL DEEPER INDICATOR */}
      <button 
        id="scroll-to-about"
        onClick={() => onNavigate('about')}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Explore Journey</span>
        <ArrowDown size={14} className="animate-bounce text-cyan-600" />
      </button>
    </section>
  );
}
