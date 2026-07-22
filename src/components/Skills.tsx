'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Cpu, 
  Database, 
  Globe, 
  Wrench, 
  Sparkles, 
  Orbit, 
  Grid, 
  Layers, 
  Search, 
  Terminal, 
  Zap,
  Radio,
  Wifi,
  Server,
  Activity,
  Atom,
  Compass,
  Box,
  Flame
} from 'lucide-react';

interface SkillItem {
  name: string;
  level: number; // 1-100
  experience: string;
  highlight?: string;
  icon: React.ElementType;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string; // Tailwind color accent
  glowColor: string; // Hex for box shadows
  description: string;
  skills: SkillItem[];
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'orbit'>('orbit');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories: SkillCategory[] = [
    {
      id: 'core-dsa',
      title: "Core Competencies & DSA",
      icon: Code,
      color: "from-cyan-500 to-blue-600",
      glowColor: "rgba(6, 182, 212, 0.35)",
      description: "Fundamental computer science logic, algorithmic problem solving, and low-level optimization.",
      skills: [
        { name: "C Programming", level: 88, experience: "Academic & Systems", highlight: "Primary low-level language used for algorithm implementation", icon: Terminal },
        { name: "Python", level: 85, experience: "Automation & Scripting", highlight: "Used for rapid data processing and algorithm prototyping", icon: Code },
        { name: "Data Structures & Algorithms (DSA)", level: 82, experience: "Core CS Focus", highlight: "Arrays, Linked Lists, Trees, Graphs, Sorting & Searching", icon: Layers },
        { name: "Problem Solving", level: 85, experience: "Competitive & Hackathons", highlight: "Logical decomposition & algorithmic efficiency", icon: Zap },
        { name: "Debugging", level: 80, experience: "GDB & DevTools", highlight: "Systematic root-cause analysis and profiling", icon: Search },
        { name: "Modular Programming", level: 88, experience: "Architecture Design", highlight: "Clean, maintainable, decoupled code modules", icon: Box }
      ]
    },
    {
      id: 'frontend',
      title: "Frontend Web Engineering",
      icon: Globe,
      color: "from-blue-500 to-indigo-600",
      glowColor: "rgba(59, 130, 246, 0.35)",
      description: "Building responsive, modern, and accessible web interfaces with clean visual craftsmanship.",
      skills: [
        { name: "HTML5", level: 92, experience: "Semantic Web", highlight: "Standard semantic layouts, web accessibility (a11y)", icon: Globe },
        { name: "CSS3", level: 90, experience: "Modern Layouts", highlight: "Flexbox, Grid, CSS Variables, Animations", icon: Sparkles },
        { name: "JavaScript (ES6+)", level: 88, experience: "Client & Server", highlight: "Async/Await, DOM manipulation, Closures, Modules", icon: Atom },
        { name: "React.js", level: 85, experience: "Component Systems", highlight: "Custom Hooks, Context API, State Management", icon: Orbit },
        { name: "Next.js", level: 80, experience: "Full-stack SSR", highlight: "App Router, Server Actions, Dynamic Routing", icon: Server },
        { name: "Tailwind CSS", level: 92, experience: "Utility-First", highlight: "Responsive typography, dark/light themes, custom tokens", icon: Flame },
        { name: "Responsive Web Design", level: 90, experience: "Cross-Device", highlight: "Fluid viewports, touch-friendly UI, adaptive grids", icon: Compass },
        { name: "Web Application Prototyping", level: 85, experience: "Interactive Mockups", highlight: "Rapid deployment of working full-featured prototypes", icon: Activity }
      ]
    },
    {
      id: 'tools',
      title: "Tools & Environments",
      icon: Wrench,
      color: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.35)",
      description: "Developer tools, version control, build environments, and debugging suites.",
      skills: [
        { name: "VS Code", level: 92, experience: "Daily IDE", highlight: "Custom extensions, workspace configurations, debugging", icon: Terminal },
        { name: "Google Colab", level: 82, experience: "Data Prototyping", highlight: "Interactive Python notebooks and algorithm validation", icon: Code },
        { name: "Git & GitHub", level: 85, experience: "Version Control", highlight: "Branching workflows, pull requests, commit hygiene", icon: Layers },
        { name: "Vite", level: 88, experience: "Build Tooling", highlight: "Fast HMR, bundle optimization, SSR integration", icon: Zap },
        { name: "Linux Shell", level: 78, experience: "Command Line", highlight: "Bash scripting, process management, SSH, file permissions", icon: Terminal },
        { name: "Postman", level: 82, experience: "API Testing", highlight: "Endpoint inspection, JSON schema verification, auth headers", icon: Server }
      ]
    },
    {
      id: 'iot',
      title: "IoT & Hardware Prototyping",
      icon: Cpu,
      color: "from-amber-500 to-orange-600",
      glowColor: "rgba(245, 158, 11, 0.35)",
      description: "Embedded system logic, telemetry sensor data streams, and hardware prototyping.",
      skills: [
        { name: "ESP32 / Arduino", level: 82, experience: "Microcontrollers", highlight: "C/C++ firmware, GPIO pin manipulation, serial comms", icon: Cpu },
        { name: "LoRaWAN", level: 75, experience: "Long-Range IoT", highlight: "Low-power telemetry transmission over wireless nodes", icon: Radio },
        { name: "IoT Telemetry", level: 85, experience: "Dasheri Shield Project", highlight: "Temperature, humidity & leaf wetness data streams", icon: Activity },
        { name: "Sensor Data Handling", level: 82, experience: "Signal Processing", highlight: "Noise filtering, sliding window smoothing, threshold alerts", icon: Wifi },
        { name: "Crop Health Logic", level: 88, experience: "Agri-Tech Domain", highlight: "Fungal disease forecasting rules for mango orchards", icon: Sparkles }
      ]
    },
    {
      id: 'backend',
      title: "Backend Fundamentals",
      icon: Database,
      color: "from-purple-500 to-pink-600",
      glowColor: "rgba(168, 85, 247, 0.35)",
      description: "Server-side REST API development, routing, structured data storage, and authentication.",
      skills: [
        { name: "Node.js", level: 82, experience: "Server Runtime", highlight: "Event loop, asynchronous I/O, file system operations", icon: Server },
        { name: "Express API", level: 85, experience: "Web Server", highlight: "REST endpoints, middleware routing, error handling", icon: Terminal },
        { name: "REST Architecture", level: 88, experience: "API Design", highlight: "Clean HTTP status codes, JSON payload conventions", icon: Layers },
        { name: "JSON Storage", level: 85, experience: "Data Persistence", highlight: "In-memory caches & structured document storage", icon: Database },
        { name: "System Design Concepts", level: 75, experience: "Architecture", highlight: "Client-server separation, decoupling, proxying", icon: Grid }
      ]
    }
  ];

  // Filter skills based on category and search
  const filteredCategories = categories.map(cat => ({
    ...cat,
    skills: cat.skills.filter(s => 
      (activeFilter === 'all' || cat.id === activeFilter) &&
      (searchQuery === '' || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || cat.title.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(cat => cat.skills.length > 0);

  const totalSkillCount = categories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills-section" className="relative py-24 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background Cosmic Slate Accents & Floating Micro-Stars */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Ambient Cosmic Dust Stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          animate={{
            y: [0, i % 2 === 0 ? -18 : 18, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 4 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
          className="absolute w-2 h-2 rounded-full bg-cyan-400/40 blur-[1px] pointer-events-none"
          style={{
            top: `${15 + i * 14}%`,
            left: `${10 + (i * 16) % 80}%`
          }}
        />
      ))}

      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 text-xs font-mono font-bold mb-4"
        >
          <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Interactive Skill Galaxy</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 font-sans"
        >
          Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">Constellation</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-sm text-zinc-500 mt-3 font-mono max-w-xl mx-auto"
        >
          Hover over nodes to trigger zero-G drift, cosmic icon pulses, and aura glows across {totalSkillCount} technical competencies.
        </motion.p>
      </div>

      {/* Controls Bar: Categories & View Toggle & Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-zinc-200/80 shadow-sm">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'all'
                ? 'bg-zinc-900 text-white shadow-md'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80'
            }`}
          >
            <Sparkles size={13} className={activeFilter === 'all' ? 'text-cyan-400' : 'text-zinc-400'} />
            All Galaxies ({totalSkillCount})
          </button>

          {categories.map(cat => {
            const CatIcon = cat.icon;
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-cyan-500 text-white border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-50 border-zinc-200/80 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <CatIcon size={13} />
                {cat.title.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* Search & View Switcher */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          {/* Search Box */}
          <div className="relative flex-1 lg:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text"
              placeholder="Search skills (e.g., C, React)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:bg-white transition-all"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-mono">
            <button
              onClick={() => setViewMode('orbit')}
              className={`p-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                viewMode === 'orbit' ? 'bg-white text-cyan-600 shadow-sm font-bold' : 'text-zinc-500 hover:text-zinc-800'
              }`}
              title="Cosmic Galaxy Orbit Layout"
            >
              <Orbit size={14} />
              <span className="hidden sm:inline">Orbit</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                viewMode === 'grid' ? 'bg-white text-cyan-600 shadow-sm font-bold' : 'text-zinc-500 hover:text-zinc-800'
              }`}
              title="Structured Grid Layout"
            >
              <Grid size={14} />
              <span className="hidden sm:inline">Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Galaxy Grid View or Orbit Display */}
      <AnimatePresence mode="wait">
        {viewMode === 'orbit' ? (
          /* COSMIC ORBIT GALAXY VIEW */
          <motion.div 
            key="orbit-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {filteredCategories.map((cat, catIdx) => {
              const CatIcon = cat.icon;
              return (
                <motion.div 
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.1 }}
                  className="relative p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-zinc-200/80 shadow-lg shadow-zinc-200/50 hover:border-cyan-300 transition-all duration-300 overflow-hidden group"
                >
                  {/* Category Accent Aura */}
                  <div 
                    className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-40"
                    style={{ background: cat.glowColor }}
                  />

                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-100">
                    <div className="flex items-center gap-3.5">
                      {/* Animated Category Icon Badge with Pulsing Halo */}
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.15 }}
                        transition={{ duration: 0.6, type: 'spring' }}
                        className={`relative p-3 rounded-2xl bg-gradient-to-tr ${cat.color} text-white shadow-md cursor-pointer group/cat` }
                      >
                        <CatIcon size={22} className="relative z-10" />

                        {/* Orbiting Halo Pulse Ring */}
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.35, 1],
                            opacity: [0.3, 0.7, 0.3]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 rounded-2xl bg-cyan-400/40 blur-sm pointer-events-none"
                        />
                      </motion.div>

                      <div>
                        <h3 className="font-bold text-lg text-zinc-900 flex items-center gap-2">
                          {cat.title}
                          <span className="text-xs font-mono text-zinc-400 font-normal">
                            ({cat.skills.length} nodes)
                          </span>
                        </h3>
                        <p className="text-xs text-zinc-500 font-mono mt-0.5">{cat.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100 self-start sm:self-auto">
                      <Zap size={12} className="text-cyan-500 animate-pulse" />
                      <span>Cluster Active</span>
                    </div>
                  </div>

                  {/* Interactive Orbit Skill Nodes */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 py-2">
                    {cat.skills.map((skill, sIdx) => {
                      const SkillIcon = skill.icon;
                      // Calculate unique float parameters for organic zero-G motion
                      const floatOffset = (sIdx % 2 === 0 ? -7 : 7);
                      const floatDuration = 3.2 + (sIdx % 4) * 0.6;
                      const floatDelay = sIdx * 0.15;

                      return (
                        <motion.div
                          key={sIdx}
                          layout
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ 
                            scale: 1, 
                            opacity: 1,
                            y: [0, floatOffset, 0]
                          }}
                          transition={{
                            y: {
                              repeat: Infinity,
                              duration: floatDuration,
                              ease: "easeInOut",
                              delay: floatDelay
                            },
                            scale: { duration: 0.3 },
                            opacity: { duration: 0.3 }
                          }}
                          whileHover={{ 
                            scale: 1.15, 
                            y: -12,
                            rotate: (sIdx % 2 === 0 ? 2 : -2),
                            boxShadow: `0 20px 36px -10px ${cat.glowColor}`
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSkill(skill)}
                          className="group/node relative px-4 py-3 rounded-2xl bg-gradient-to-b from-white/95 via-zinc-50/85 to-zinc-100/90 hover:from-white hover:to-cyan-50/80 border border-zinc-200/90 hover:border-cyan-400 text-zinc-800 text-xs font-mono font-medium flex items-center gap-3 cursor-pointer shadow-sm hover:shadow-2xl transition-colors duration-300 backdrop-blur-sm"
                        >
                          {/* Pulsing Cosmic Icon Container */}
                          <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 group-hover/node:bg-cyan-500 group-hover/node:text-white transition-colors duration-300">
                            {/* Framer Motion Pulsing Icon */}
                            <motion.div
                              whileHover={{ 
                                scale: [1, 1.25, 1],
                                rotate: [0, -12, 12, 0]
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <SkillIcon size={15} />
                            </motion.div>

                            {/* Halo Orbit Ring */}
                            <motion.span 
                              animate={{ 
                                scale: [1, 1.4, 1],
                                opacity: [0.2, 0.6, 0.2] 
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                              }}
                              className="absolute inset-0 rounded-xl border border-cyan-400/50 pointer-events-none"
                            />
                          </div>

                          <span className="font-bold tracking-tight text-zinc-800 group-hover/node:text-cyan-950 transition-colors">
                            {skill.name}
                          </span>

                          {/* Level Tag Pill */}
                          <span className="px-2 py-0.5 rounded-lg bg-zinc-200/80 text-zinc-700 group-hover/node:bg-cyan-200 group-hover/node:text-cyan-900 text-[10px] font-bold transition-colors">
                            {skill.level}%
                          </span>

                          {/* Cosmic Aura Glow Ring on Hover */}
                          <div 
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover/node:opacity-100 transition-opacity duration-300 pointer-events-none border border-cyan-400/60 shadow-[inset_0_0_14px_rgba(6,182,212,0.2)]"
                          />

                          {/* Floating Tooltip preview on hover */}
                          <div className="absolute left-1/2 -bottom-14 -translate-x-1/2 opacity-0 group-hover/node:opacity-100 pointer-events-none transition-all duration-300 z-30 whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-zinc-900/95 backdrop-blur-md text-white text-[10px] font-mono shadow-2xl border border-zinc-700/80 flex items-center gap-1.5">
                            <Sparkles size={11} className="text-cyan-400 animate-pulse" />
                            <span>{skill.highlight}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* STRUCTURED GRID CARD VIEW */
          <motion.div 
            key="grid-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCategories.flatMap(cat => 
              cat.skills.map((skill, idx) => {
                const SkillIcon = skill.icon;
                return (
                  <motion.div
                    key={`${cat.id}-${idx}`}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => setSelectedSkill(skill)}
                    className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-cyan-300 cursor-pointer space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <motion.div 
                          whileHover={{ scale: 1.2, rotate: 12 }}
                          className={`p-2 rounded-xl bg-gradient-to-tr ${cat.color} text-white shadow-sm`}
                        >
                          <SkillIcon size={16} />
                        </motion.div>
                        <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                          {cat.title.split(' ')[0]}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-100">
                        {skill.level}%
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 group-hover:text-cyan-600 transition-colors">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-zinc-500 font-mono mt-0.5">{skill.experience}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${cat.color}`}
                      />
                    </div>

                    <p className="text-[11px] text-zinc-600 font-mono line-clamp-1">
                      💡 {skill.highlight}
                    </p>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SKILL DETAIL MODAL */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-3">
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="p-2.5 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100 shadow-sm"
                  >
                    {React.createElement(selectedSkill.icon, { size: 20 })}
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg text-zinc-900">{selectedSkill.name}</h3>
                    <span className="text-xs font-mono text-zinc-500">{selectedSkill.experience}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-1.5 rounded-xl hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Proficiency Dial & Bar */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-zinc-700 uppercase">Proficiency Rating</span>
                  <span className="font-black text-cyan-600 text-sm">{selectedSkill.level} / 100</span>
                </div>
                <div className="w-full bg-zinc-200 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedSkill.level}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                  />
                </div>
              </div>

              {/* Engineering Application Highlight */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal size={14} className="text-cyan-600" />
                  Practical Engineering Usage
                </h4>
                <p className="text-xs text-zinc-700 font-mono leading-relaxed bg-cyan-50/50 p-3 rounded-xl border border-cyan-100">
                  {selectedSkill.highlight}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-mono font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Close Constellation Node
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
