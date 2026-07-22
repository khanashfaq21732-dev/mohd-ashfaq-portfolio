'use client';

import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Search, Tag, Sparkles, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
  techStack: string[];
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const posts: BlogPost[] = [
    {
      id: 'dasheri-shield-article',
      title: "Building Dasheri Shield: IoT Sensors for Precision Agriculture",
      date: "2026-06-15",
      readTime: "5 min read",
      excerpt: "How we leveraged ESP32 microcontrollers, LoRaWAN wireless telemetry, and real-time disease forecasting algorithms to protect mango orchards from anthracnose and mildew.",
      category: "Agri-Tech & IoT",
      techStack: ["ESP32", "LoRaWAN", "Python", "IoT", "Sensors", "Recharts"]
    },
    {
      id: 'web-architecture-article',
      title: "Why Modern Web Dev Needs Clean Modular Architecture",
      date: "2026-05-20",
      readTime: "4 min read",
      excerpt: "Key learnings from building high-performance full-stack applications with React, TypeScript, and serverless Node APIs with zero-dependency bloat.",
      category: "Software Engineering",
      techStack: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Architecture"]
    },
    {
      id: 'sensor-telemetry-article',
      title: "Micro-Climate Telemetry: Processing Low-Level Sensor Streams",
      date: "2026-04-10",
      readTime: "6 min read",
      excerpt: "Algorithmic approaches to signal filtering, threshold detection, and low-power microcontroller state loops in agricultural field deployments.",
      category: "Embedded Systems",
      techStack: ["C Programming", "Embedded C", "Microcontrollers", "Data Structures", "DSP"]
    }
  ];

  // Extract all unique tech tags across all posts
  const allTags = ['All', ...Array.from(new Set(posts.flatMap(p => [p.category, ...p.techStack])))];

  // Filter posts by title, category, or technology stack
  const filteredPosts = posts.filter(post => {
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = query === '' || 
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.techStack.some(tech => tech.toLowerCase().includes(query));

    const matchesTag = selectedTag === 'All' || 
      post.category === selectedTag || 
      post.techStack.includes(selectedTag);

    return matchesQuery && matchesTag;
  });

  return (
    <section id="blog-section" className="py-20 px-6 max-w-6xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 text-xs font-mono font-bold mb-4">
          <BookOpen className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
          <span>Technical Publications</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Articles</span>
        </h2>
        <div className="w-16 h-1.5 bg-cyan-500 mx-auto rounded-full mt-4" />
        <p className="text-sm text-zinc-500 mt-3 font-mono">Insights, hardware deep-dives, and engineering notes</p>
      </div>

      {/* SEARCH BAR & FILTER CONTROLS */}
      <div className="mb-10 space-y-4 p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-zinc-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter articles by title or tech stack (e.g. ESP32, React, C)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-200 text-xs font-mono bg-zinc-50/80 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-1"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-zinc-500 whitespace-nowrap">
            Showing <span className="font-bold text-cyan-600">{filteredPosts.length}</span> of {posts.length} articles
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-zinc-100">
          <span className="text-[11px] font-mono text-zinc-400 font-bold flex items-center gap-1 mr-2">
            <Tag size={12} className="text-cyan-500" /> Filter:
          </span>
          {allTags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'bg-zinc-100/80 text-zinc-600 hover:bg-zinc-200/80'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLES GRID */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <motion.div 
              key={post.id} 
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group p-6 rounded-2xl glass-panel hover:border-cyan-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-mono font-bold uppercase tracking-wider border border-cyan-200">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                    <Clock size={11} /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-cyan-600 transition-colors leading-snug cursor-pointer">
                  {post.title}
                </h3>

                <p className="text-xs text-zinc-600 font-mono leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.techStack.map((tech) => (
                    <span 
                      key={tech}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery(tech);
                      }}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[10px] font-mono font-semibold hover:bg-cyan-100 hover:text-cyan-800 transition-colors cursor-pointer"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-t border-zinc-100 pt-4 mt-2">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <Calendar size={12} className="text-cyan-500" /> {post.date}
                </span>
                <span className="text-cyan-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 cursor-pointer">
                  Read Article →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="text-center py-16 p-8 rounded-3xl bg-white/60 border border-zinc-200/80 space-y-3">
          <Terminal size={32} className="mx-auto text-zinc-400" />
          <h3 className="font-bold text-zinc-800 text-base font-sans">No matching articles found</h3>
          <p className="text-xs text-zinc-500 font-mono max-w-md mx-auto">
            Try searching for another technology like <span className="text-cyan-600 font-bold">ESP32</span>, <span className="text-cyan-600 font-bold">React</span>, or <span className="text-cyan-600 font-bold">Python</span>.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('All');
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-mono font-bold hover:bg-zinc-800 transition-colors mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
