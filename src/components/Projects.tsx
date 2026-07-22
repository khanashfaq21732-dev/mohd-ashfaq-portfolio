'use client';

import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Github, Filter, Code2, Calendar, CheckCircle2, ChevronLeft, ChevronRight, X, AlertCircle, Thermometer, Droplets, Activity, ShieldAlert, Sparkles, Database, UploadCloud, Check, Zap, Eye, BookOpen, Trophy, Cpu, Radio, BarChart3, TrendingUp, RefreshCw } from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Project } from '../types';
import ashfaqProfileImg from '../assets/images/ashfaq_profile_photo_1784734869215.jpg';
import dasheriShieldImg from '../assets/images/dasheri_shield_project_1784737011410.jpg';
import portfolioWebsiteImg from '../assets/images/portfolio_website_project_1784737030883.jpg';

const initialProjects: Project[] = [
  {
    id: 'dasheri-shield',
    title: 'Dasheri Shield (AamRakshak)',
    tagline: 'Mobile-First Agri-Tech App for Crop Disease Identification & Direct Marketplace',
    category: 'IoT & Embedded',
    description: 'A mobile-first frontend web application developed to assist small-scale farmers with crop disease identification and direct-to-market sales. Built with a focus on web accessibility, responsive design, and low-bandwidth performance.',
    details: 'Project Context:\nThis project was developed as an AgriTech hackathon prototype targeting the Malihabad mango-farming belt. The core engineering challenge was designing a highly accessible, lightweight interface for a demographic with spotty internet connectivity and entry-level mobile hardware.\n\nCore Features:\n• Simulated Edge AI Interface: Frontend module simulating image processing for crop disease detection with localized UI feedback.\n• Dynamic Inventory Dashboard: Client-side rendering of inventory status cards featuring color-coded risk alerts based on harvest shelf-life.\n• Direct Marketplace Directory: Integrated tel: URI schemes enabling direct farmer-to-buyer communication, bypassing traditional intermediaries.\n• Bilingual UI: Designed for users with limited digital literacy, featuring a dual-language (English/Hindi) interface and reliance on accessible visual cues.\n• Low-Bandwidth Optimization: Engineered without heavy frontend frameworks to ensure rapid Time to Interactive (TTI) on 2G/3G networks.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'SPA Architecture', 'Mobile-First', 'Edge AI Simulation', 'AgriTech'],
    featured: true,
    image: dasheriShieldImg,
    githubUrl: 'https://github.com/khanashfaq21732-dev/dasheri-shield',
    demoUrl: '#dasheri-shield'
  },
  {
    id: 'portfolio-website',
    title: 'Interactive Portfolio & Engineering Showcase',
    tagline: 'Modern React & TypeScript Developer Portfolio',
    category: 'Web Engineering',
    description: 'A responsive full-stack developer portfolio showcasing computer science projects, hackathon achievements, and interactive live dashboards.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js'],
    featured: true,
    image: portfolioWebsiteImg,
    githubUrl: 'https://github.com/khanashfaq21732-dev/mohd-ashfaq-portfolio'
  }
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dasheri Shield telemetry states
  const [temp, setTemp] = useState(31.5);
  const [moisture, setMoisture] = useState(42);
  const [humidity, setHumidity] = useState(78);
  const [lwd, setLwd] = useState(4.2);
  const [isStreaming, setIsStreaming] = useState(true);
  const [chartTab, setChartTab] = useState<'telemetry' | 'trends' | 'plots'>('telemetry');

  const [telemetryHistory, setTelemetryHistory] = useState([
    { time: '10:00:00', temp: 29.8, moisture: 48, humidity: 72, lwd: 3.8, threat: 12 },
    { time: '10:00:05', temp: 30.2, moisture: 46, humidity: 74, lwd: 4.0, threat: 15 },
    { time: '10:00:10', temp: 30.8, moisture: 45, humidity: 75, lwd: 4.1, threat: 18 },
    { time: '10:00:15', temp: 31.2, moisture: 43, humidity: 77, lwd: 4.2, threat: 22 },
    { time: '10:00:20', temp: 31.5, moisture: 42, humidity: 78, lwd: 4.2, threat: 25 },
  ]);

  const plotComparisonData = [
    { name: 'Plot D-4 (Dasheri)', temp: 31.5, moisture: 42, threat: 15, nodes: 4 },
    { name: 'Plot A-2 (Chausa)', temp: 33.1, moisture: 38, threat: 42, nodes: 3 },
    { name: 'Plot B-1 (Langra)', temp: 29.4, moisture: 55, threat: 8, nodes: 3 },
    { name: 'Plot F-9 (Kesar)', temp: 32.0, moisture: 40, threat: 28, nodes: 2 },
  ];

  useEffect(() => {
    let interval: any;
    if (isStreaming) {
      interval = setInterval(() => {
        const nextTemp = +(temp + (Math.random() - 0.5) * 0.4).toFixed(1);
        const nextMoisture = Math.min(100, Math.max(0, Math.round(moisture + (Math.random() - 0.5) * 3)));
        const nextHumidity = Math.min(100, Math.max(0, Math.round(humidity + (Math.random() - 0.5) * 2)));
        const nextLwd = +(Math.max(0, lwd + (Math.random() - 0.5) * 0.2)).toFixed(1);
        const calculatedThreat = Math.min(100, Math.max(5, Math.round((nextHumidity * 0.3) + (nextLwd * 7) + (nextTemp * 0.2))));

        setTemp(nextTemp);
        setMoisture(nextMoisture);
        setHumidity(nextHumidity);
        setLwd(nextLwd);

        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];

        setTelemetryHistory(prev => {
          const updated = [...prev, {
            time: timeStr,
            temp: nextTemp,
            moisture: nextMoisture,
            humidity: nextHumidity,
            lwd: nextLwd,
            threat: calculatedThreat
          }];
          return updated.slice(-12);
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isStreaming, temp, moisture, humidity, lwd]);

  const categories = ['All', 'IoT & Embedded', 'Web Engineering'];

  const filteredProjects = initialProjects.filter(p => {
    const query = searchTerm.toLowerCase().trim();
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = query === '' || 
                          p.title.toLowerCase().includes(query) || 
                          p.tagline.toLowerCase().includes(query) ||
                          p.description.toLowerCase().includes(query) ||
                          p.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects-section" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="text-center mb-12 md:mb-16">
        <h2 id="projects-title" className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Engineering</span> Projects
        </h2>
        <div className="w-16 h-1.5 bg-cyan-500 mx-auto rounded-full mt-4" />
        <p className="text-xs sm:text-sm text-zinc-500 mt-3 font-mono">Agri-Tech IoT systems, Web Apps, and Embedded Hardware</p>
      </div>

      {/* FEATURED HIGHLIGHT: DASHERI SHIELD LIVE TELEMETRY DASHBOARD */}
      <div className="mb-12 md:mb-16 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-cyan-200/80 shadow-xl space-y-5 sm:space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-200 flex-shrink-0 mt-0.5 sm:mt-0">
              <ShieldAlert size={22} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-mono font-bold text-[10px] uppercase">
                  Agri-Tech Hackathon Finalist
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-mono font-bold text-[10px] uppercase border border-amber-200">
                  Mobile-First 2G/3G Ready
                </span>
                <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">• Node Cluster: Plot D-4</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-zinc-900 mt-1.5">Dasheri Shield (AamRakshak) Telemetry Dashboard</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                isStreaming 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                  : 'bg-zinc-100 border-zinc-200 text-zinc-600'
              }`}
            >
              <RefreshCw size={14} className={isStreaming ? 'animate-spin' : ''} />
              {isStreaming ? 'Pause Real-Time Stream' : 'Resume Telemetry Stream'}
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-zinc-200 shadow-xs">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-zinc-500 mb-1">
              <span>Ambient Temp</span>
              <Thermometer size={15} className="text-cyan-600" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-zinc-900">{temp}°C</span>
            <span className="text-[10px] font-mono text-emerald-600 block mt-1">Optimal Range</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-zinc-200 shadow-xs">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-zinc-500 mb-1">
              <span>Soil Moisture</span>
              <Droplets size={15} className="text-blue-600" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-zinc-900">{moisture}%</span>
            <span className="text-[10px] font-mono text-cyan-600 block mt-1">Capacitive Sensor</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-zinc-200 shadow-xs">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-zinc-500 mb-1">
              <span>Air Humidity</span>
              <Activity size={15} className="text-purple-600" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-zinc-900">{humidity}%</span>
            <span className="text-[10px] font-mono text-purple-600 block mt-1">DHT22 Module</span>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-zinc-200 shadow-xs">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-zinc-500 mb-1">
              <span>Leaf Wetness</span>
              <Sparkles size={15} className="text-amber-600" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-zinc-900">{lwd} hrs</span>
            <span className="text-[10px] font-mono text-amber-600 block mt-1">Spore Risk Factor</span>
          </div>
        </div>

        {/* RECHARTS REAL-TIME STREAMING VISUALIZER */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3">
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-2">
                <BarChart3 size={16} className="text-cyan-600" />
                <span>Live IoT Sensor Stream Plotted with Recharts</span>
              </h4>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                Real-time multi-channel telemetry streams from LoRaWAN orchards
              </p>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 bg-zinc-100 p-1 rounded-xl border border-zinc-200 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setChartTab('telemetry')}
                className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer whitespace-nowrap ${
                  chartTab === 'telemetry' ? 'bg-white text-cyan-700 shadow-xs' : 'text-zinc-500'
                }`}
              >
                Telemetry
              </button>
              <button
                onClick={() => setChartTab('trends')}
                className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer whitespace-nowrap ${
                  chartTab === 'trends' ? 'bg-white text-rose-700 shadow-xs' : 'text-zinc-500'
                }`}
              >
                Disease Index
              </button>
              <button
                onClick={() => setChartTab('plots')}
                className={`flex-1 sm:flex-none px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase cursor-pointer whitespace-nowrap ${
                  chartTab === 'plots' ? 'bg-white text-blue-700 shadow-xs' : 'text-zinc-500'
                }`}
              >
                Plots Comparison
              </button>
            </div>
          </div>

          <div className="w-full h-52 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              {chartTab === 'telemetry' ? (
                <AreaChart data={telemetryHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="moistGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'monospace' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'monospace' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px', fontFamily: 'monospace' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace', paddingTop: '6px' }} />
                  <Area type="monotone" dataKey="temp" name="Temp (°C)" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#tempGrad)" />
                  <Area type="monotone" dataKey="moisture" name="Soil Moisture (%)" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#moistGrad)" />
                  <Area type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#a855f7" strokeWidth={2} fillOpacity={0} />
                </AreaChart>
              ) : chartTab === 'trends' ? (
                <LineChart data={telemetryHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'monospace' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'monospace' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px', fontFamily: 'monospace' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace', paddingTop: '6px' }} />
                  <Line type="monotone" dataKey="threat" name="Disease Risk Index (%)" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="lwd" name="Leaf Wetness (hrs)" stroke="#ec4899" strokeWidth={2} strokeDasharray="4 4" />
                </LineChart>
              ) : (
                <BarChart data={plotComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'monospace' }} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b', fontFamily: 'monospace' }} domain={[0, 60]} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px', fontFamily: 'monospace' }} />
                  <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace', paddingTop: '6px' }} />
                  <Bar dataKey="temp" name="Temp (°C)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="moisture" name="Moisture (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="threat" name="Threat Load (%)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 sm:mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-zinc-900 text-white shadow-md' 
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={15} />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-zinc-200 text-xs font-mono bg-white text-zinc-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* PROJECTS GRID */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map(project => (
          <div 
            key={project.id} 
            className={`group p-5 sm:p-6 rounded-2xl glass-panel border hover:border-cyan-300 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4 overflow-hidden ${
              project.id === 'dasheri-shield' ? 'border-cyan-300/80 bg-gradient-to-br from-cyan-50/30 via-white to-blue-50/20' : 'border-zinc-200/80'
            }`}
          >
            <div>
              {/* Project Card Image Banner */}
              {project.image && (
                <div 
                  className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 bg-zinc-950 border border-zinc-200/80 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-zinc-900/85 backdrop-blur-md text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider border border-zinc-700/60 flex items-center gap-1.5">
                    <Sparkles size={12} />
                    <span>Project Interface Preview</span>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-mono font-bold uppercase border border-cyan-200">
                  {project.category}
                </span>
                {project.id === 'dasheri-shield' && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold uppercase">
                    ⭐ Featured Hackathon App
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-cyan-600 transition-colors">{project.title}</h3>
              <p className="text-xs text-zinc-500 font-mono mt-1 mb-3">{project.tagline}</p>

              {/* HIGHLIGHT PROMINENT SUMMARY FOR DASHERI SHIELD */}
              {project.id === 'dasheri-shield' ? (
                <div className="mb-4 space-y-2.5">
                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans font-medium">
                    {project.description}
                  </p>
                  
                  {/* MOBILE & DESKTOP QUICK FEATURE HIGHLIGHTS */}
                  <div className="p-3 rounded-xl bg-white/80 border border-cyan-200/80 space-y-1.5 font-sans text-xs">
                    <span className="text-[10px] font-mono font-bold text-cyan-900 uppercase tracking-wider block">
                      ⚡ Key Mobile-First Highlights:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-zinc-700">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-cyan-600 flex-shrink-0" />
                        <span>Simulated Edge AI Disease Identification</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-cyan-600 flex-shrink-0" />
                        <span>Client-Side Inventory Shelf-Life Risk Alerts</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-cyan-600 flex-shrink-0" />
                        <span>Direct Farmer-to-Buyer <code className="bg-zinc-100 px-1 rounded text-[10px]">tel:</code> Marketplace</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-cyan-600 flex-shrink-0" />
                        <span>Bilingual (English/Hindi) High-Contrast UI</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">{project.description}</p>
              )}
              
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[10px] font-mono border border-zinc-200">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
              <button
                onClick={() => setSelectedProject(project)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs min-h-[42px]"
              >
                <Eye size={15} /> Case Study
              </button>
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors min-h-[42px]"
                >
                  <Github size={15} /> Code
                </a>
              )}
            </div>
          </div>
        ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl bg-white/60 border border-zinc-200/80 space-y-3">
          <Code2 size={32} className="mx-auto text-zinc-400" />
          <h3 className="font-bold text-zinc-800 text-base font-sans">No matching projects found</h3>
          <p className="text-xs text-zinc-500 font-mono max-w-md mx-auto">
            Try searching for <span className="text-cyan-600 font-bold">IoT</span>, <span className="text-cyan-600 font-bold">React</span>, <span className="text-cyan-600 font-bold">ESP32</span>, or <span className="text-cyan-600 font-bold">TypeScript</span>.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-mono font-bold hover:bg-zinc-800 transition-colors mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* CASE STUDY MODAL - CROSS PLATFORM OPTIMIZED (MOBILE / WINDOWS / MAC) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 max-h-[92vh] sm:max-h-[85vh] flex flex-col">
            {/* STICKY MODAL HEADER */}
            <div className="px-5 py-4 border-b border-zinc-100 flex items-start justify-between gap-3 bg-zinc-50/80 backdrop-blur-xs flex-shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-mono font-bold uppercase border border-cyan-200">
                    {selectedProject.category}
                  </span>
                  {selectedProject.id === 'dasheri-shield' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold uppercase">
                      AgriTech Hackathon Prototype
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900 mt-1 font-sans">{selectedProject.title}</h3>
                <p className="text-xs font-mono text-zinc-500 mt-0.5">{selectedProject.tagline}</p>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2.5 rounded-xl bg-zinc-200/60 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer flex-shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close Case Study"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1">
              {selectedProject.image && (
                <div className="w-full h-44 sm:h-60 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200 shadow-md">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-5 text-sm text-zinc-700 leading-relaxed font-sans">
                <div>
                  <h4 className="font-bold text-zinc-900 font-mono text-xs uppercase tracking-wider text-cyan-600 mb-1.5 flex items-center gap-1.5">
                    <BookOpen size={15} /> Executive Overview
                  </h4>
                  <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed">{selectedProject.description}</p>
                </div>

                {selectedProject.id === 'dasheri-shield' ? (
                  <div className="space-y-4">
                    {/* PROJECT CONTEXT */}
                    <div className="p-4 rounded-xl bg-cyan-50/70 border border-cyan-200 text-xs space-y-1.5 font-sans">
                      <h5 className="font-bold font-mono text-cyan-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Trophy size={14} className="text-cyan-600" /> Project Context & Challenge
                      </h5>
                      <p className="text-zinc-800 leading-relaxed">
                        This project was developed as an AgriTech hackathon prototype targeting the Malihabad mango-farming belt. The core engineering challenge was designing a highly accessible, lightweight interface for a demographic with spotty internet connectivity and entry-level mobile hardware.
                      </p>
                    </div>

                    {/* TECHNOLOGIES USED */}
                    <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2 font-mono text-xs">
                      <h5 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Code2 size={14} className="text-cyan-600" /> Technologies & Architecture
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-sans text-xs">
                        <div className="p-3 rounded-xl bg-white border border-zinc-200">
                          <span className="font-mono text-[10px] font-bold text-zinc-400 block uppercase">Frontend</span>
                          <span className="font-semibold text-zinc-800">HTML5, CSS3, Vanilla JS (ES6+)</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-zinc-200">
                          <span className="font-mono text-[10px] font-bold text-zinc-400 block uppercase">Architecture</span>
                          <span className="font-semibold text-zinc-800">SPA Simulation via DOM Manipulation</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-zinc-200">
                          <span className="font-mono text-[10px] font-bold text-zinc-400 block uppercase">Design Focus</span>
                          <span className="font-semibold text-zinc-800">Mobile-First, CSS Variables, High-Contrast</span>
                        </div>
                      </div>
                    </div>

                    {/* CORE FEATURES */}
                    <div className="p-4 sm:p-5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3 font-sans text-xs">
                      <h5 className="font-bold font-mono text-zinc-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                        <Zap size={14} className="text-amber-500" /> Core Engineered Features
                      </h5>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2.5">
                          <div className="p-1 rounded-md bg-cyan-100 text-cyan-700 mt-0.5 flex-shrink-0">
                            <CheckCircle2 size={14} />
                          </div>
                          <div>
                            <strong className="text-zinc-900 font-bold block">Simulated Edge AI Interface:</strong>
                            <span className="text-zinc-600">A frontend module simulating image processing for crop disease detection with localized UI feedback.</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <div className="p-1 rounded-md bg-cyan-100 text-cyan-700 mt-0.5 flex-shrink-0">
                            <CheckCircle2 size={14} />
                          </div>
                          <div>
                            <strong className="text-zinc-900 font-bold block">Dynamic Inventory Dashboard:</strong>
                            <span className="text-zinc-600">Client-side rendering of inventory status cards featuring color-coded risk alerts based on harvest shelf-life.</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <div className="p-1 rounded-md bg-cyan-100 text-cyan-700 mt-0.5 flex-shrink-0">
                            <CheckCircle2 size={14} />
                          </div>
                          <div>
                            <strong className="text-zinc-900 font-bold block">Direct Marketplace Directory:</strong>
                            <span className="text-zinc-600">Integrated <code className="bg-zinc-200 px-1 py-0.5 rounded text-[11px] font-mono">tel:</code> URI schemes enabling direct farmer-to-buyer communication, bypassing traditional intermediaries.</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <div className="p-1 rounded-md bg-cyan-100 text-cyan-700 mt-0.5 flex-shrink-0">
                            <CheckCircle2 size={14} />
                          </div>
                          <div>
                            <strong className="text-zinc-900 font-bold block">Bilingual UI:</strong>
                            <span className="text-zinc-600">Designed for users with limited digital literacy, featuring a dual-language (English/Hindi) interface and a reliance on accessible visual cues.</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <div className="p-1 rounded-md bg-cyan-100 text-cyan-700 mt-0.5 flex-shrink-0">
                            <CheckCircle2 size={14} />
                          </div>
                          <div>
                            <strong className="text-zinc-900 font-bold block">Low-Bandwidth Optimization:</strong>
                            <span className="text-zinc-600">Engineered without heavy frontend frameworks to ensure a rapid Time to Interactive (TTI) on 2G/3G networks.</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : selectedProject.details ? (
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs space-y-2 font-mono">
                    <h4 className="font-bold text-zinc-900 uppercase">Engineering Details & Impact</h4>
                    <p className="whitespace-pre-line text-zinc-600">{selectedProject.details}</p>
                  </div>
                ) : null}

                <div>
                  <h4 className="font-bold text-zinc-900 font-mono text-xs uppercase tracking-wider mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-800 text-xs font-mono border border-zinc-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STICKY FOOTER */}
            <div className="px-5 py-3.5 border-t border-zinc-100 flex flex-wrap items-center justify-end gap-2.5 bg-zinc-50/80 backdrop-blur-xs flex-shrink-0">
              {selectedProject.githubUrl && (
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Github size={14} /> View GitHub Repo
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2.5 rounded-xl bg-zinc-200/80 hover:bg-zinc-200 text-zinc-800 text-xs font-mono font-bold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
