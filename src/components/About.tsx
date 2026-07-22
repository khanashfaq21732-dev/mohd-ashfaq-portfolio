'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Award, GraduationCap, MapPin, Briefcase, Download } from 'lucide-react';
import { Experience } from '../types';
import userProfileImg from '../assets/images/ashfaq_profile_photo_1784734869215.jpg';

interface AboutProps {
  experiences: Experience[];
  onDownloadResume: () => void;
}

export default function About({ experiences, onDownloadResume }: AboutProps) {
  const educationItems = experiences.filter(e => e.type === 'education');
  const workItems = experiences.filter(e => e.type === 'work');
  const achievementItems = experiences.filter(e => e.type === 'achievement');

  const renderDescription = (desc: string | string[]) => {
    if (Array.isArray(desc)) {
      return (
        <ul className="list-disc pl-4 text-xs text-zinc-600 flex flex-col gap-1.5 leading-relaxed">
          {desc.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-xs text-zinc-600 leading-relaxed">{desc}</p>;
  };

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
            className="sticky top-28 p-6 rounded-2xl flex flex-col gap-6 glass-panel"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 to-pink-500 p-[2px] shadow-sm flex-shrink-0 overflow-hidden">
                <img
                  src={typeof userProfileImg === 'string' ? userProfileImg : (userProfileImg as any)?.src || '/assets/images/ashfaq_profile_photo_1784734869215.jpg'}
                  alt="Mohd. Ashfaq Khan"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/assets/images/ashfaq_profile_photo_1784734869215.jpg';
                  }}
                  className="w-full h-full rounded-full object-cover object-top bg-white"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Mohd. Ashfaq Khan</h3>
                <p className="text-xs font-mono text-cyan-600">Software Engineer Undergrad</p>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              Passionate Computer Science student and Agri-Tech hackathon finalist with hands-on experience building IoT sensor systems, full-stack web platforms, and C/C++ algorithms.
            </p>

            <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2.5 text-xs text-zinc-600">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-cyan-600" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-cyan-600" />
                <span>Open for Internships & Projects</span>
              </div>
            </div>

            <button
              onClick={onDownloadResume}
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download size={14} />
              Download Resume
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: TIMELINES */}
        <div className="lg:col-span-2 space-y-12">
          {/* WORK / PROJECTS HISTORY */}
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
                    className="relative p-5 rounded-xl transition-all group glass-panel"
                  >
                    <div className="absolute -left-[27px] top-6 w-3 h-3 rounded-full bg-cyan-500 border-2 border-white group-hover:scale-125 transition-transform shadow" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                      <div>
                        <h4 className="text-base font-bold text-zinc-900 group-hover:text-cyan-600 transition-colors">{item.role || item.title}</h4>
                        <p className="text-xs font-mono text-zinc-500">{item.company || item.organization}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50 border border-cyan-200/50 px-2 py-1 rounded-full w-fit">
                        <Calendar size={10} />
                        {item.period}
                      </span>
                    </div>

                    {renderDescription(item.description)}
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
                    className="relative p-5 rounded-xl transition-all group glass-panel"
                  >
                    <div className="absolute -left-[27px] top-6 w-3 h-3 rounded-full bg-pink-500 border-2 border-white group-hover:scale-125 transition-transform shadow" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                      <div>
                        <h4 className="text-base font-bold text-zinc-900 group-hover:text-pink-600 transition-colors">{item.role || item.title}</h4>
                        <p className="text-xs font-mono text-zinc-500">{item.company || item.organization}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-pink-700 bg-pink-50 border border-pink-200/50 px-2 py-1 rounded-full w-fit">
                        <Calendar size={10} />
                        {item.period}
                      </span>
                    </div>

                    {renderDescription(item.description)}
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
                    className="relative p-5 rounded-xl transition-all group glass-panel"
                  >
                    <div className="absolute -left-[27px] top-6 w-3 h-3 rounded-full bg-amber-500 border-2 border-white group-hover:scale-125 transition-transform shadow" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                      <div>
                        <h4 className="text-base font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">{item.role || item.title}</h4>
                        <p className="text-xs font-mono text-zinc-500">{item.company || item.organization}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200/50 px-2 py-1 rounded-full w-fit">
                        <Calendar size={10} />
                        {item.period}
                      </span>
                    </div>

                    {renderDescription(item.description)}
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
