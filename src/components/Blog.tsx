'use client';

import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Search, Tag, X, Terminal, ArrowRight, Share2, Check, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
  techStack: string[];
  author: string;
  content: string[];
  keyTakeaways: string[];
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const posts: BlogPost[] = [
    {
      id: 'dasheri-shield-article',
      title: "Building Dasheri Shield: IoT Sensors for Precision Agriculture",
      date: "2026-06-15",
      readTime: "5 min read",
      author: "Mohd Ashfaq Khan",
      category: "Agri-Tech & IoT",
      techStack: ["ESP32", "LoRaWAN", "Python", "IoT", "Sensors", "Recharts"],
      excerpt: "How we leveraged ESP32 microcontrollers, LoRaWAN wireless telemetry, and real-time disease forecasting algorithms to protect mango orchards from anthracnose and mildew.",
      keyTakeaways: [
        "Sub-GHz LoRaWAN propagation overcomes dense mango canopy signal attenuation.",
        "Leaf wetness duration (LWD) combined with 28°C–32°C relative humidity triggers automated spore alerts.",
        "Mobile-first client SPA simulation allows farmers on 2G/3G networks to access real-time risk indicators instantaneously."
      ],
      content: [
        "In the Malihabad mango belt of Uttar Pradesh, fungal infections such as Anthracnose and Powdery Mildew destroy up to 35% of seasonal yields if untreated. Traditional preventative spraying relies on fixed calendar schedules rather than micro-climate micro-data, leading to chemical waste and crop damage.",
        "To address this, we developed Dasheri Shield (AamRakshak). We deployed battery-backed ESP32 sensor nodes equipped with digital temperature/humidity probes, capacitive soil sensors, and leaf wetness grids across orchard zones.",
        "Sensor payloads are transmitted via LoRaWAN packets to a local gateway and processed through edge risk-indexing algorithms. On the frontend, a mobile-first responsive dashboard renders dynamic telemetry stream charts using Recharts with instant visual risk alerts.",
        "The web application was designed specifically for low-bandwidth 2G/3G connectivity with bilingual (English/Hindi) UI controls and direct farmer-to-buyer 'tel:' URI integrations to bypass middleman commissions."
      ]
    },
    {
      id: 'web-architecture-article',
      title: "Why Modern Web Dev Needs Clean Modular Architecture",
      date: "2026-05-20",
      readTime: "4 min read",
      author: "Mohd Ashfaq Khan",
      category: "Software Engineering",
      techStack: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Architecture"],
      excerpt: "Key learnings from building high-performance full-stack applications with React, TypeScript, and serverless Node APIs with zero-dependency bloat.",
      keyTakeaways: [
        "Strict separation of concerns prevents monolithic component sprawl.",
        "Type safety with TypeScript reduces runtime state anomalies across complex dashboards.",
        "Optimizing bundle size and using utility CSS yields near-instant Time-To-Interactive (TTI)."
      ],
      content: [
        "Building scalable web applications requires moving beyond single-file setups. When client states involve real-time charts, filter engines, and interactive modals, clean component boundary separation is essential.",
        "By enforcing strict TypeScript interfaces across component props and API responses, refactoring becomes predictable and runtime null-reference bugs are virtually eliminated.",
        "Using Tailwind CSS with Vite ensures zero unused CSS runtime overhead while allowing responsive breakpoint adjustments across mobile, tablet, and desktop screens with mathematical layout rhythm."
      ]
    },
    {
      id: 'sensor-telemetry-article',
      title: "Micro-Climate Telemetry: Processing Low-Level Sensor Streams",
      date: "2026-04-10",
      readTime: "6 min read",
      author: "Mohd Ashfaq Khan",
      category: "Embedded Systems",
      techStack: ["C Programming", "Embedded C", "Microcontrollers", "Data Structures", "DSP"],
      excerpt: "Algorithmic approaches to signal filtering, threshold detection, and low-power microcontroller state loops in agricultural field deployments.",
      keyTakeaways: [
        "Exponential Moving Average (EMA) filters eliminate noise spikes in analogue soil moisture sensors.",
        "Deep sleep timer wakeups extend ESP32 18650 lithium battery operational lifespan to 6+ months.",
        "Packet compaction formats telemetry payloads into compact 12-byte hex frames for low-cost transmission."
      ],
      content: [
        "Field-deployed microcontrollers face harsh ambient conditions: ambient temperature swings, power constraints, and noisy analogue readings. Standard unbuffered ADC sampling often produces erratic sensor spikes.",
        "By applying a digital Exponential Moving Average (EMA) filter directly on the MCU hardware timer interrupt, signal jitter is smoothed out before data serialization.",
        "Furthermore, by structuring duty cycles around 15-minute deep-sleep cycles, power consumption is reduced by 92%, enabling solar-supplemented battery longevity in remote agricultural installations."
      ]
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

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="blog-section" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 text-xs font-mono font-bold mb-4">
          <BookOpen className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
          <span>Technical Publications</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Articles</span>
        </h2>
        <div className="w-16 h-1.5 bg-cyan-500 mx-auto rounded-full mt-4" />
        <p className="text-xs sm:text-sm text-zinc-500 mt-3 font-mono">Insights, hardware deep-dives, and engineering notes</p>
      </div>

      {/* SEARCH BAR & FILTER CONTROLS */}
      <div className="mb-8 md:mb-10 space-y-4 p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-zinc-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title or tech (e.g. ESP32, React, C)..."
              className="w-full pl-10 pr-10 py-2.5 sm:py-2 rounded-xl border border-zinc-200 text-xs font-mono bg-zinc-50/80 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:bg-white transition-all min-h-[42px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-1.5 cursor-pointer"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-zinc-500 flex items-center justify-between sm:justify-end gap-2">
            <span>Showing <strong className="text-cyan-600">{filteredPosts.length}</strong> of {posts.length} articles</span>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-zinc-100">
          <span className="text-[11px] font-mono text-zinc-400 font-bold flex items-center gap-1 mr-1 flex-shrink-0">
            <Tag size={12} className="text-cyan-500" /> Filter:
          </span>
          {allTags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold whitespace-nowrap transition-all cursor-pointer min-h-[32px] ${
                selectedTag === tag
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLES GRID */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <motion.div 
              key={post.id} 
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedArticle(post)}
              className="group p-5 sm:p-6 rounded-2xl glass-panel border border-zinc-200/80 hover:border-cyan-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer bg-white"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-mono font-bold uppercase tracking-wider border border-cyan-200">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1 flex-shrink-0">
                    <Clock size={11} /> {post.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-cyan-600 transition-colors leading-snug font-sans">
                  {post.title}
                </h3>

                <p className="text-xs text-zinc-600 font-sans leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.techStack.map((tech) => (
                    <span 
                      key={tech}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery(tech);
                      }}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 text-[10px] font-mono font-semibold hover:bg-cyan-100 hover:text-cyan-800 transition-colors"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-t border-zinc-100 pt-3.5 mt-2">
                <span className="flex items-center gap-1 text-[11px]">
                  <Calendar size={12} className="text-cyan-500" /> {post.date}
                </span>
                <span className="text-cyan-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs">
                  Read Article <ArrowRight size={13} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="text-center py-12 p-6 rounded-2xl bg-white/80 border border-zinc-200 space-y-3">
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
            className="px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-mono font-bold hover:bg-zinc-800 transition-colors mt-2 cursor-pointer min-h-[40px]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ARTICLE READER MODAL (MOBILE & DESKTOP OPTIMIZED) */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-2 sm:p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 max-h-[92vh] sm:max-h-[85vh] flex flex-col"
            >
              {/* MODAL HEADER */}
              <div className="px-5 py-4 border-b border-zinc-100 flex items-start justify-between gap-3 bg-zinc-50/90 backdrop-blur-xs flex-shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-mono font-bold uppercase border border-cyan-200">
                      {selectedArticle.category}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                      <Clock size={12} /> {selectedArticle.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-zinc-900 font-sans leading-snug">{selectedArticle.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-2.5 rounded-xl bg-zinc-200/60 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer flex-shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
                  aria-label="Close article"
                >
                  <X size={20} />
                </button>
              </div>

              {/* MODAL CONTENT */}
              <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 font-sans text-sm text-zinc-700 leading-relaxed">
                {/* AUTHOR & DATE METADATA */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-800 font-semibold">
                    <User size={14} className="text-cyan-600" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Calendar size={14} className="text-cyan-600" />
                    <span>Published {selectedArticle.date}</span>
                  </div>
                </div>

                {/* KEY TAKEAWAYS BOX */}
                <div className="p-4 sm:p-5 rounded-2xl bg-cyan-50/60 border border-cyan-200/80 space-y-2.5">
                  <h4 className="font-mono text-xs font-bold text-cyan-900 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen size={14} className="text-cyan-600" /> Key Technical Takeaways
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-800">
                    {selectedArticle.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ARTICLE BODY PARAGRAPHS */}
                <div className="space-y-4 text-zinc-800 text-sm sm:text-base leading-relaxed">
                  {selectedArticle.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* TECH STACK TAGS */}
                <div className="pt-4 border-t border-zinc-100 space-y-2">
                  <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block">Technologies Mentioned</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArticle.techStack.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 font-mono text-xs border border-zinc-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="px-5 py-3.5 border-t border-zinc-100 flex items-center justify-between gap-3 bg-zinc-50/90 backdrop-blur-xs flex-shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[40px]"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                  <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
                </button>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-mono font-bold hover:bg-zinc-800 transition-colors cursor-pointer min-h-[40px]"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

