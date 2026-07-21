import React, { useState } from 'react';
import { Cpu, Terminal, Layers, Wrench, Sparkles } from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Languages' | 'Core CS' | 'Web & Frameworks' | 'Tools & Platforms'>('All');

  const categories = [
    { id: 'All', label: 'All Skills', icon: <Sparkles size={14} className="text-cyan-600" /> },
    { id: 'Languages', label: 'Languages', icon: <Terminal size={14} className="text-cyan-600" /> },
    { id: 'Core CS', label: 'Core CS', icon: <Cpu size={14} className="text-pink-600" /> },
    { id: 'Web & Frameworks', label: 'Web & Frameworks', icon: <Layers size={14} className="text-purple-600" /> },
    { id: 'Tools & Platforms', label: 'Tools', icon: <Wrench size={14} className="text-amber-600" /> }
  ];

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Languages': return 'from-cyan-500 to-blue-600 text-cyan-700 border-cyan-200';
      case 'Core CS': return 'from-pink-500 to-rose-600 text-pink-700 border-pink-200';
      case 'Web & Frameworks': return 'from-purple-500 to-indigo-600 text-purple-700 border-purple-200';
      case 'Tools & Platforms': return 'from-amber-500 to-yellow-600 text-amber-700 border-amber-200';
      default: return 'from-zinc-500 to-slate-600 text-zinc-600 border-zinc-200';
    }
  };

  return (
    <section id="skills-section" className="py-24 px-6 max-w-6xl mx-auto text-zinc-800">
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <h2 id="skills-title" className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          Skills & <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">Technology</span>
        </h2>
        <div className="w-16 h-1.5 bg-pink-500 mx-auto rounded-full mt-4" />
        <p className="text-sm font-sans font-medium text-zinc-500 mt-3 uppercase tracking-widest">
          Core competencies and technological stack
        </p>
      </div>

      {/* CATEGORY FILTER SELECTOR */}
      <div id="skills-categories" className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`filter-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
              selectedCategory === cat.id
                ? 'bg-zinc-900 text-white border-zinc-950 shadow-sm'
                : 'bg-white/80 text-zinc-600 hover:text-zinc-950 border-zinc-200 hover:bg-zinc-100'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN: GALAXY VIRTUAL CORE (THE ORBIT) */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center p-6 rounded-2xl border border-zinc-200/60 bg-white/80 backdrop-blur-md h-full min-h-[380px] relative overflow-hidden shadow-sm">
          {/* Glowing central sphere */}
          <div className="absolute w-44 h-44 rounded-full bg-cyan-100/30 blur-[30px] animate-pulse" />
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 via-pink-500 to-purple-600 p-[1px] animate-spin-slow shadow-md flex items-center justify-center relative z-10">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="font-mono text-xs font-bold tracking-widest text-zinc-800">SRMU</span>
            </div>
          </div>

          {/* Simulated orbit rings */}
          <div className="absolute w-48 h-48 rounded-full border border-dashed border-cyan-300/40 animate-spin-slow" />
          <div className="absolute w-64 h-64 rounded-full border border-dashed border-pink-300/30 animate-spin-reverse" />
          <div className="absolute w-80 h-80 rounded-full border border-dashed border-purple-300/20 animate-spin-slow" />

          <div className="mt-8 text-center z-10">
            <h3 className="text-base font-bold text-zinc-900 font-sans flex items-center justify-center gap-1.5">
              <Sparkles size={16} className="text-amber-500" />
              DSA & Systems Core
            </h3>
            <p className="text-xs text-zinc-500 mt-2 max-w-[200px] leading-relaxed mx-auto">
              Hover on skill nodes to inspect competency levels and progress diagnostics.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMNS: THE SKILL NODES CLUSTER */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
          {/* SKILL CARDS CONTAINER */}
          <div 
            id="skills-galaxy-grid" 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {filteredSkills.map((skill) => {
              const borderStyles = getCategoryColor(skill.category);
              const isHovered = hoveredSkill?.id === skill.id;

              return (
                <div
                  key={skill.id}
                  id={`skill-card-${skill.id}`}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`p-4 rounded-xl border bg-white/70 backdrop-blur-sm transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    isHovered 
                      ? 'border-zinc-300 bg-white -translate-y-0.5 shadow-md' 
                      : 'border-zinc-200/60 hover:border-zinc-300 shadow-sm'
                  }`}
                >
                  {/* Category Accent Stripe */}
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${borderStyles.split(' ')[0]}`} />
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-zinc-800 tracking-wide pl-2">
                      {skill.name}
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-50 border ${borderStyles.split(' ').slice(2).join(' ')}`}>
                      {skill.category}
                    </span>
                  </div>

                  {/* PROGRESS TRACKER */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${borderStyles.split(' ').slice(0, 2).join(' ')} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-600 w-8 text-right">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DYNAMIC METRIC DETAILS CALLOUT */}
          <div 
            id="skills-detail-panel"
            className="p-5 rounded-xl border border-zinc-200 bg-white/80 backdrop-blur-md shadow-sm flex flex-col justify-center min-h-[96px] transition-all"
          >
            {hoveredSkill ? (
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCategoryColor(hoveredSkill.category).split(' ').slice(0, 2).join(' ')} p-[1px] flex-shrink-0 shadow-sm`}>
                  <div className="w-full h-full rounded-lg bg-white flex items-center justify-center font-bold text-zinc-800 text-xs">
                    {hoveredSkill.name.substring(0, 2).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-zinc-900">{hoveredSkill.name}</h4>
                    <span className="text-[10px] font-mono text-cyan-600">Approved competency</span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed font-sans">
                    Proven record of applying <strong>{hoveredSkill.name}</strong> to modular, low-overhead software structures and academic project modules. Level is set at {hoveredSkill.level}% proficiency.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs font-sans font-medium text-zinc-400 text-center uppercase tracking-widest">
                Hover on a technology above to inspect capability metrics
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
