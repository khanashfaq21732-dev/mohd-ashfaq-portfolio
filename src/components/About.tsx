/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Award, GraduationCap, MapPin, Briefcase, Download } from 'lucide-react';
import { Experience } from '../types';

interface AboutProps {
  experiences: Experience[];
  onDownloadResume: () => void;
}

export default function About({ experiences, onDownloadResume }: AboutProps) {
  // Separate into Work vs Education & Achievements
  const educationItems = experiences.filter(e => e.type === 'education');
  const workItems = experiences.filter(e => e.type === 'work');
  const achievementItems = experiences.filter(e => e.type === 'achievement');

  return (
    <section id="about-section" className="py-24 px-6 max-w-6xl mx-auto text-zinc-800">
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <h2 id="about-title" className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          My <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Engineering</span> Journey
        </h2>
        <div className="w-16 h-1.5 bg-cyan-500 mx-auto rounded-full mt-4" />
        <p className="text-sm font-sans font-medium text-zinc-500 mt-3 uppercase tracking-widest">
          Education, achievements, and practical projects
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: MINI BIO CARD */}
        <div className="lg:col-span-1">
          <div 
            id="about-bio-card"
            className="sticky top-28 p-6 rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-md shadow-md flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 to-pink-500 p-[2px] shadow-sm flex-shrink-0">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-zinc-900 font-mono text-sm">
                  MAK
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Mohd. Ashfaq Khan</h3>
                <p className="text-xs font-mono text-cyan-600">Software Engineer Undergrad</p>
              </div>
            </div>

            <p className="text-sm text-zinc-600 leading-relaxed">
              As a Computer Science student at <strong>Shri Ramswaroop Memorial University</strong>, I specialize in combining algorithmic foundations (C, Python, DSA) with modern web development (Vite, React, Express) to solve physical and agricultural workflows.
            </p>

            <div className="flex flex-col gap-3 border-t border-zinc-100 pt-4 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-cyan-600" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={14} className="text-pink-600" />
                <span>B.Tech CSE (Class of 2027)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={14} className="text-amber-500" />
                <span>CGPA: 6.54 / 10.0</span>
              </div>
            </div>

            <button
              id="bio-download-cv"
              onClick={onDownloadResume}
              className="mt-2 w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Download size={14} />
              Download Full Resume
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: CHRONOLOGICAL GLASS TIMELINE */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* WORK EXPERIENCE */}
          {workItems.length > 0 && (
            <div>
              <h3 className="text-lg font-black tracking-wider text-zinc-900 uppercase font-mono mb-6 flex items-center gap-2">
                <Briefcase size={18} className="text-cyan-600" />
                Hands-on Projects & Experience
              </h3>
              <div className="flex flex-col gap-6 pl-4 border-l border-cyan-200">
                {workItems.map((item) => (
                  <div 
                    key={item.id}
                    id={`timeline-item-${item.id}`}
                    className="relative p-5 rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-md shadow-sm hover:border-zinc-300 hover:bg-white transition-all group"
                  >
                    <div className="absolute -left-[27px] top-6 w-3 h-3 rounded-full bg-cyan-500 border-2 border-white group-hover:scale-125 transition-transform shadow" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                      <div>
                        <h4 className="text-base font-bold text-zinc-900 group-hover:text-cyan-600 transition-colors">{item.role}</h4>
                        <p className="text-xs font-mono text-zinc-500">{item.company}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50 border border-cyan-200/50 px-2 py-1 rounded-full w-fit">
                        <Calendar size={10} />
                        {item.period}
                      </span>
                    </div>

                    <ul className="list-disc pl-4 text-xs text-zinc-600 flex flex-col gap-1.5 leading-relaxed">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDUCATION HISTORY */}
          {educationItems.length > 0 && (
            <div>
              <h3 className="text-lg font-black tracking-wider text-zinc-900 uppercase font-mono mb-6 flex items-center gap-2">
                <GraduationCap size={18} className="text-pink-600" />
                Education Background
              </h3>
              <div className="flex flex-col gap-6 pl-4 border-l border-pink-200">
                {educationItems.map((item) => (
                  <div 
                    key={item.id}
                    id={`timeline-item-${item.id}`}
                    className="relative p-5 rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-md shadow-sm hover:border-zinc-300 hover:bg-white transition-all group"
                  >
                    <div className="absolute -left-[27px] top-6 w-3 h-3 rounded-full bg-pink-500 border-2 border-white group-hover:scale-125 transition-transform shadow" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                      <div>
                        <h4 className="text-base font-bold text-zinc-900 group-hover:text-pink-600 transition-colors">{item.role}</h4>
                        <p className="text-xs font-mono text-zinc-500">{item.company} | <span className="text-[10px] font-sans font-bold text-zinc-400">{item.location}</span></p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-pink-700 bg-pink-50 border border-pink-200/50 px-2 py-1 rounded-full w-fit">
                        <Calendar size={10} />
                        {item.period}
                      </span>
                    </div>

                    <ul className="list-disc pl-4 text-xs text-zinc-600 flex flex-col gap-1 leading-relaxed">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {achievementItems.length > 0 && (
            <div>
              <h3 className="text-lg font-black tracking-wider text-zinc-900 uppercase font-mono mb-6 flex items-center gap-2">
                <Award size={18} className="text-amber-500" />
                Competitions & Awards
              </h3>
              <div className="flex flex-col gap-6 pl-4 border-l border-amber-200">
                {achievementItems.map((item) => (
                  <div 
                    key={item.id}
                    id={`timeline-item-${item.id}`}
                    className="relative p-5 rounded-xl border border-zinc-200 bg-white/70 backdrop-blur-md shadow-sm hover:border-zinc-300 hover:bg-white transition-all group"
                  >
                    <div className="absolute -left-[27px] top-6 w-3 h-3 rounded-full bg-amber-500 border-2 border-white group-hover:scale-125 transition-transform shadow" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                      <div>
                        <h4 className="text-base font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">{item.role}</h4>
                        <p className="text-xs font-mono text-zinc-500">{item.company}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200/50 px-2 py-1 rounded-full w-fit">
                        <Calendar size={10} />
                        {item.period}
                      </span>
                    </div>

                    <ul className="list-disc pl-4 text-xs text-zinc-600 flex flex-col gap-1 leading-relaxed">
                      {item.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
