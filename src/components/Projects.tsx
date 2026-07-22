'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Github, Filter, Code2, Calendar, CheckCircle2, ChevronLeft, ChevronRight, X, AlertCircle, Thermometer, Droplets, Activity, ShieldAlert, Sparkles, Database, UploadCloud, Check, Zap, Eye, BookOpen, Trophy, Cpu } from 'lucide-react';
import { Project } from '../types';

function DasheriShieldDashboard() {
  const [activeLeaf, setActiveLeaf] = useState<'healthy' | 'anthracnose' | 'mildew'>('healthy');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    status: string;
    prob: number;
    action: string;
    color: string;
    severity: string;
  } | null>({
    status: 'Healthy Canopy',
    prob: 99.1,
    action: 'Plantation tissue is structurally sound. Maintain current watering schedules and check again in 72 hours.',
    color: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20',
    severity: '0% disease load'
  });
  
  const [temp, setTemp] = useState(31.5);
  const [moisture, setMoisture] = useState(42);
  const [humidity, setHumidity] = useState(78);
  const [lwd, setLwd] = useState(4.2);
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewMode, setViewMode] = useState<'blueprint' | 'livecam'>('blueprint');

  const [observer, setObserver] = useState('');
  const [plot, setPlot] = useState('Plot D-4');
  const [status, setStatus] = useState('Healthy');
  const [remarks, setRemarks] = useState('');
  const [logs, setLogs] = useState<any[]>([
    { id: 1, observer: 'Ashfaq Khan', plot: 'Plot A-1', status: 'Healthy', time: '10 mins ago' },
    { id: 2, observer: 'Arif Patel', plot: 'Plot C-3', status: 'Suspected Anthracnose', time: '1 hr ago' }
  ]);

  // Handle telemetry streaming interval
  useEffect(() => {
    let interval: any;
    if (isStreaming) {
      interval = setInterval(() => {
        setTemp(prev => +(prev + (Math.random() - 0.5) * 0.4).toFixed(1));
        setMoisture(prev => Math.min(100, Math.max(0, Math.round(prev + (Math.random() - 0.5) * 3))));
        setHumidity(prev => Math.min(100, Math.max(0, Math.round(prev + (Math.random() - 0.5) * 2))));
        setLwd(prev => +(Math.max(0, prev + (Math.random() - 0.5) * 0.2)).toFixed(1));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isStreaming]);

  const handleScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      if (activeLeaf === 'healthy') {
        setScanResult({
          status: 'Healthy Canopy',
          prob: 99.1,
          action: 'Plantation tissue is structurally sound. Maintain current watering schedules and check again in 72 hours.',
          color: 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20',
          severity: '0% disease load'
        });
      } else if (activeLeaf === 'anthracnose') {
        setScanResult({
          status: 'Anthracnose Spots Detected',
          prob: 94.6,
          action: 'URGENT: Isolate affected branch instantly. Apply organic copper-based fungicide spray. Reduce leaf wetness duration below 3 hours.',
          color: 'text-rose-400 border-rose-500/20 bg-rose-950/20',
          severity: '45% tissue infection (Moderate)'
        });
      } else {
        setScanResult({
          status: 'Powdery Mildew Coating',
          prob: 88.3,
          action: 'WARNING: Fungal spore network spreading on upper leaves. Spray biological neem oil remedy immediately. Ensure proper solar exposure through canopy pruning.',
          color: 'text-amber-400 border-amber-500/20 bg-amber-950/20',
          severity: '20% tissue coating (Early Stage)'
        });
      }
    }, 2000);
  };

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!observer.trim()) return;
    const newLog = {
      id: Date.now(),
      observer: observer.trim(),
      plot,
      status,
      time: 'Just now'
    };
    setLogs(prev => [newLog, ...prev]);
    setObserver('');
    setRemarks('');
  };

  const leafImages = {
    healthy: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=600&q=80',
    anthracnose: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
    mildew: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'
  };

  return (
    <div className="space-y-6 text-zinc-800 font-sans mt-4">
      {/* HEADER BADGE & SUMMARY */}
      <div className="border border-cyan-200 bg-cyan-50/40 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-cyan-100 text-cyan-600">
              <ShieldAlert size={14} />
            </span>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-700">
              Interactive Crop Diagnostics Sandbox
            </span>
          </div>
          <p className="text-[11px] text-zinc-500 max-w-xl">
            This module simulates 'The Dasheri Shield' microclimate sensor grid and computer-vision diagnostic tool in real time. Interact with the sensor stream, sample leaves, or log new plots.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsStreaming(!isStreaming)}
            className={`px-3.5 py-1.5 rounded-xl text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isStreaming
                ? 'bg-rose-100 text-rose-700 border border-rose-200 animate-pulse'
                : 'bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100/70'
            }`}
          >
            <Activity size={12} className={isStreaming ? 'animate-spin' : ''} />
            {isStreaming ? 'STOP STREAM' : 'SIMULATE STREAM'}
          </button>
        </div>
      </div>

      {/* TELEMETRY METRIC GAUGES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1 */}
        <div className="p-3.5 rounded-xl border border-zinc-200 bg-white shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 opacity-60" />
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Ambient Temp</span>
            <Thermometer size={14} className="text-cyan-600" />
          </div>
          <p className="text-lg font-mono font-black text-zinc-800">{temp} °C</p>
          <span className="text-[9px] text-zinc-400 font-mono">Sensors: Active</span>
        </div>

        {/* Metric 2 */}
        <div className="p-3.5 rounded-xl border border-zinc-200 bg-white shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-60" />
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Soil Moisture</span>
            <Droplets size={14} className="text-blue-500" />
          </div>
          <p className="text-lg font-mono font-black text-zinc-800">{moisture}%</p>
          <span className="text-[9px] text-zinc-400 font-mono">Plot: D-Zone</span>
        </div>

        {/* Metric 3 */}
        <div className="p-3.5 rounded-xl border border-zinc-200 bg-white shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 opacity-60" />
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Air Humidity</span>
            <Activity size={14} className="text-purple-500" />
          </div>
          <p className="text-lg font-mono font-black text-zinc-800">{humidity}%</p>
          <span className="text-[9px] text-zinc-400 font-mono">Level: Stable</span>
        </div>

        {/* Metric 4 */}
        <div className="p-3.5 rounded-xl border border-zinc-200 bg-white shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-pink-500 opacity-60" />
          <div className="flex items-center justify-between text-zinc-400 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Leaf Wetness</span>
            <Zap size={14} className="text-pink-500" />
          </div>
          <p className="text-lg font-mono font-black text-zinc-800">{lwd} hrs</p>
          <span className="text-[9px] text-zinc-400 font-mono">LWD Threshold: 8.0</span>
        </div>
      </div>

      {/* ORCHARD IoT FIELD TOPOLOGY */}
      <div className="p-4 rounded-xl border border-zinc-200 bg-white/70 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-5 items-center animate-fade-in">
        <div className="md:col-span-2 overflow-hidden rounded-lg border border-zinc-200 aspect-[16/9] relative bg-zinc-50 group">
          <img
            src={viewMode === 'blueprint' ? "/src/assets/images/dasheri_iot_grid_1784626704159.jpg" : "/src/assets/images/mango_farming_dashboard_1784627790898.jpg"}
            alt={viewMode === 'blueprint' ? "Dasheri Shield IoT Orchard Topology" : "Mango Farming Orchard Feed"}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
          <div className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[8px] font-mono font-bold flex items-center gap-1 shadow-sm ${
            viewMode === 'blueprint' ? 'text-cyan-700 bg-white/95 border border-cyan-200' : 'text-amber-800 bg-amber-50/95 border border-amber-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${viewMode === 'blueprint' ? 'bg-cyan-500' : 'bg-amber-500'}`} />
            {viewMode === 'blueprint' ? 'LIVE SENSOR GRID GEOMAP' : 'LIVE ORCHARD CAM feed'}
          </div>
        </div>
        <div className="space-y-3.5">
          {/* Toggle Switches */}
          <div className="flex items-center gap-1.5 bg-zinc-100/80 p-1 rounded-xl border border-zinc-200/50">
            <button
              type="button"
              onClick={() => setViewMode('blueprint')}
              className={`flex-1 py-1 rounded-lg text-[9px] font-mono font-black uppercase transition-all cursor-pointer ${
                viewMode === 'blueprint'
                  ? 'bg-white text-cyan-700 shadow-xs border border-zinc-200'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Blueprint Map
            </button>
            <button
              type="button"
              onClick={() => setViewMode('livecam')}
              className={`flex-1 py-1 rounded-lg text-[9px] font-mono font-black uppercase transition-all cursor-pointer ${
                viewMode === 'livecam'
                  ? 'bg-white text-amber-700 shadow-xs border border-zinc-200'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Orchard Cam
            </button>
          </div>

          {viewMode === 'blueprint' ? (
            <div>
              <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold text-cyan-700 bg-cyan-50 border border-cyan-100 uppercase tracking-wider mb-1.5 inline-block">
                Deployment Blueprint
              </span>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 mb-1 flex items-center gap-1.5">
                <Database size={13} />
                Sensor Grid Topology
              </h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Wireless solar-powered IoT microclimate nodes are deployed across 12 sectors of the Dasheri orchard. They continuously stream temperature, moisture, and leaf wetness metrics directly to the centralized gateway to predict and mitigate disease loads before visible symptoms spread.
              </p>
            </div>
          ) : (
            <div>
              <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-100 uppercase tracking-wider mb-1.5 inline-block">
                Active Crop Feed
              </span>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 mb-1 flex items-center gap-1.5">
                <Sparkles size={13} />
                Dasheri Canopy Camera
              </h4>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Real-time optical monitoring of the foliage and ripening clusters. Our models analyze the structural canopy health, pigmentation levels, and crop yield forecasts in conjunction with live environmental logs.
              </p>
            </div>
          )}

          <div className="space-y-1.5 font-mono text-[9px] text-zinc-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0" />
              <span>12/12 Wireless Nodes Online</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0" />
              <span>Edge compute latency &lt; 85ms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={11} className="text-emerald-500 flex-shrink-0" />
              <span>LoRaWAN gateway carrier: Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* TWO COLUMNS: LEAF DIAGNOSTIC SCANNER & WORKFLOW FORM LOGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* LEAF SCANNER INTERFACE */}
        <div className="p-4 rounded-xl border border-zinc-200 bg-white/70 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 mb-3 flex items-center gap-1.5">
              <Eye size={13} />
              Leaf Diagnostic Tissue Scanner
            </h4>
            
            {/* Target Select buttons */}
            <div className="flex items-center gap-1.5 mb-3.5 font-sans">
              <button
                type="button"
                onClick={() => { setActiveLeaf('healthy'); setScanResult(null); }}
                className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold transition-all border ${
                  activeLeaf === 'healthy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-transparent text-zinc-500 border-zinc-200 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                Healthy Tissue
              </button>
              <button
                type="button"
                onClick={() => { setActiveLeaf('anthracnose'); setScanResult(null); }}
                className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold transition-all border ${
                  activeLeaf === 'anthracnose' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-transparent text-zinc-500 border-zinc-200 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                Anthracnose Leaf
              </button>
              <button
                type="button"
                onClick={() => { setActiveLeaf('mildew'); setScanResult(null); }}
                className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold transition-all border ${
                  activeLeaf === 'mildew' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-transparent text-zinc-500 border-zinc-200 hover:text-zinc-900 hover:bg-zinc-50'
                }`}
              >
                Powdery Mildew
              </button>
            </div>

            {/* Simulated camera viewer */}
            <div className="h-44 w-full rounded-xl overflow-hidden relative border border-zinc-200 bg-zinc-100 group">
              <img
                src={leafImages[activeLeaf]}
                alt="Active plant tissue"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Scan grid animation overlay */}
              {isScanning && (
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="w-full h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-bounce mt-4" />
                  <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                  <span className="absolute inset-0 m-auto w-fit h-fit font-mono text-[10px] uppercase font-black tracking-widest text-cyan-600 bg-white/95 px-3 py-1.5 rounded-md border border-cyan-300 shadow-md">
                    SCANNING TISSUE PATTERNS...
                  </span>
                </div>
              )}

              {/* Status bar */}
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isScanning ? 'bg-cyan-500 animate-ping' : 'bg-emerald-500'}`} />
                <span className="text-[9px] font-mono text-zinc-100">Aperture f/1.8 • Active</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            {scanResult ? (
              <div className={`p-3 rounded-lg border text-[11px] font-mono leading-relaxed space-y-1.5 ${
                activeLeaf === 'healthy' ? 'text-emerald-800 border-emerald-200 bg-emerald-50/50' : 
                activeLeaf === 'anthracnose' ? 'text-rose-800 border-rose-200 bg-rose-50/50' : 
                'text-amber-800 border-amber-200 bg-amber-50/50'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span>Diagnosed: {scanResult.status}</span>
                  <span className="text-zinc-800 bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded text-[10px]">{scanResult.prob}% Match</span>
                </div>
                <div className="text-zinc-600 text-[10px] leading-snug">
                  {scanResult.action}
                </div>
                <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                  Impact index: {scanResult.severity}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleScan}
                disabled={isScanning}
                className="w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-45"
              >
                <Sparkles size={13} />
                {isScanning ? 'ANALYZING SPECTRUMS...' : 'RUN COMPUTER VISION SCAN'}
              </button>
            )}
          </div>
        </div>

        {/* WORKFLOW PAPERLESS FORM & LOG LIST */}
        <div className="p-4 rounded-xl border border-zinc-200 bg-white/70 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 mb-3 flex items-center gap-1.5">
              <Database size={13} />
              Paperless Telemetry Logging Module
            </h4>

            {/* Compare Badge */}
            <div className="mb-3.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[9px] font-mono text-emerald-800 flex items-center gap-1.5">
              <Check size={12} />
              <span>Optimized overhead: ~4s digital upload vs 5-day handwritten courier latency.</span>
            </div>

            {/* Inline submission form */}
            <form onSubmit={handleSubmitLog} className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-mono text-zinc-500 uppercase mb-1">Observer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ashfaq Khan"
                    value={observer}
                    onChange={(e) => setObserver(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-[10px] bg-white border border-zinc-200 rounded focus:border-cyan-500/30 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 text-zinc-900 placeholder-zinc-400 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono text-zinc-500 uppercase mb-1">Select Plot</label>
                  <select
                    value={plot}
                    onChange={(e) => setPlot(e.target.value)}
                    className="w-full px-2 py-1.5 text-[10px] bg-white border border-zinc-200 rounded focus:border-cyan-500/30 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 text-zinc-900 font-sans"
                  >
                    <option value="Plot D-4">Plot D-4 (Dasheri Zone)</option>
                    <option value="Plot A-2">Plot A-2 (Chausa Zone)</option>
                    <option value="Plot B-1">Plot B-1 (Langra Zone)</option>
                    <option value="Plot F-9">Plot F-9 (Kesar Zone)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[9px] font-mono text-zinc-500 uppercase mb-1">Tissue Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-2 py-1.5 text-[10px] bg-white border border-zinc-200 rounded focus:border-cyan-500/30 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 text-zinc-900 font-sans"
                  >
                    <option value="Healthy">Healthy (Optimal)</option>
                    <option value="Suspected Anthracnose">Suspected Anthracnose</option>
                    <option value="Mildew Spots">Mildew Spotted</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-mono text-zinc-500 uppercase mb-1">Remarks</label>
                  <input
                    type="text"
                    placeholder="Optional remarks..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-[10px] bg-white border border-zinc-200 rounded focus:border-cyan-500/30 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 text-zinc-900 placeholder-zinc-400 font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-1.5 rounded-lg text-[10px] font-mono font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <UploadCloud size={11} />
                COMMIT NEW DIGITAL RECORD
              </button>
            </form>
          </div>

          {/* Active logs list */}
          <div className="mt-4 pt-3.5 border-t border-zinc-100">
            <h5 className="text-[10px] font-mono font-bold uppercase text-zinc-400 mb-2">Simulated DB Records Log</h5>
            <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between text-[10px] font-mono bg-zinc-50 p-1.5 rounded border border-zinc-200">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${log.status.includes('Healthy') ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                    <span className="text-zinc-800 font-bold">{log.plot}</span>
                    <span className="text-zinc-500">• {log.observer}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px]">
                    <span className={`px-1 rounded text-[8px] ${log.status.includes('Healthy') ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>{log.status}</span>
                    <span className="text-zinc-400">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectsProps {
  projects: Project[];
  isAdmin: boolean;
  onDeleteProject?: (id: string) => void;
  onEditProject?: (p: Project) => void;
}

export default function Projects({ projects, isAdmin, onDeleteProject, onEditProject }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'React' | 'Node' | 'AI' | 'Full Stack' | 'UI'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(null);

  // Pagination bounds
  const itemsPerPage = 6;

  // Filter & Search criteria
  const filtered = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || 
                            project.category === selectedCategory || 
                            project.technologies.some(tech => tech === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Pagination slicing
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProjects = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categories: Array<'All' | 'React' | 'Node' | 'AI' | 'Full Stack' | 'UI'> = [
    'All', 'React', 'Node', 'AI', 'Full Stack', 'UI'
  ];

  const handleCategoryChange = (cat: typeof selectedCategory) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section id="projects-section" className="py-24 px-6 max-w-6xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <h2 id="projects-title" className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          Curated <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">Software Projects</span>
        </h2>
        <div className="w-16 h-1.5 bg-cyan-500 mx-auto rounded-full mt-4" />
        <p className="text-xs font-mono text-zinc-400 mt-3 uppercase tracking-widest">
          A showcase of full-stack engineering and algorithmic tracking systems
        </p>
      </div>

      {/* FILTER & SEARCH BAR PANEL */}
      <div 
        id="projects-controls" 
        className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 p-4 rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-md shadow-sm"
      >
        {/* Search input */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Search size={16} />
          </span>
          <input
            id="projects-search-input"
            type="text"
            placeholder="Search projects by name, technology, or specs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold bg-white text-zinc-900 border border-zinc-200 focus:border-cyan-500/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-all placeholder-zinc-400"
          />
        </div>

        {/* Horizontal Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`p-filter-${cat}`}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-cyan-50 text-cyan-600 border-cyan-200'
                  : 'bg-transparent text-zinc-500 border-transparent hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PROJECTS GRID CARD DISPLAY */}
      {paginatedProjects.length > 0 ? (
        <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="group rounded-2xl overflow-hidden flex flex-col h-full relative cursor-pointer glass-panel glass-panel-hover"
              onClick={() => setCaseStudyProject(project)}
            >
              {/* Image banner */}
              <div className="h-44 w-full overflow-hidden relative bg-zinc-100 border-b border-zinc-200">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold text-cyan-700 bg-cyan-50 border border-cyan-200">
                  {project.category}
                </span>
                <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-black ${
                  project.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {project.status}
                </span>
              </div>

              {/* Card info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-cyan-600 transition-colors line-clamp-1 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tech tags */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[9px] font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[9px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Actions summary footer */}
                  <div className="flex items-center justify-between border-t border-zinc-100 pt-3 mt-1 gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setCaseStudyProject(project)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50/70 border border-cyan-100 hover:bg-cyan-50 transition-colors cursor-pointer"
                    >
                      <BookOpen size={11} />
                      View Case Study
                    </button>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
                    >
                      <span>Details & Specs</span>
                      <ExternalLink size={11} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Admin overlays for deletion */}
              {isAdmin && (
                <div className="absolute top-2 left-2 flex gap-1 z-20" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onEditProject && onEditProject(project)}
                    className="p-1.5 rounded-lg bg-blue-500 text-white text-[10px] font-bold hover:bg-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteProject && onDeleteProject(project.id)}
                    className="p-1.5 rounded-lg bg-red-600 text-white text-[10px] font-bold hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div id="projects-empty-state" className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-200 rounded-2xl bg-zinc-50 text-center">
          <AlertCircle className="text-zinc-400 mb-3" size={28} />
          <p className="text-xs font-mono text-zinc-500">No projects found matching current queries</p>
        </div>
      )}

      {/* PAGINATION SWITCHES */}
      {totalPages > 1 && (
        <div id="projects-pagination" className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-xs font-mono text-zinc-500 font-bold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* DETAIL MODAL EXPAND DRAWER */}
      {selectedProject && (
        <div 
          id="project-detail-modal-root" 
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-md p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            id="project-detail-modal"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl p-6 text-left relative max-h-[90vh] overflow-y-auto text-zinc-800 glass-modal"
          >
            {/* Close Button */}
            <button 
              id="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-xl transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Banner */}
            <div className="h-64 w-full rounded-xl overflow-hidden relative mb-6 border border-zinc-200 bg-zinc-100">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold text-cyan-700 bg-cyan-50 border border-cyan-200">
                  {selectedProject.category}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold text-zinc-200 bg-black/60 border border-white/10">
                  {selectedProject.date}
                </span>
              </div>
            </div>

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900">{selectedProject.title}</h3>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-zinc-500">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span className="font-semibold">{selectedProject.status}</span>
                </div>
              </div>

              {/* Code repos / Live URL */}
              <div className="flex items-center gap-2">
                {selectedProject.gitHubUrl && (
                  <a
                    href={selectedProject.gitHubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 transition-all"
                  >
                    <Github size={13} />
                    GitHub
                  </a>
                )}
                {selectedProject.liveDemoUrl && (
                  <a
                    href={selectedProject.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-sm transition-all"
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Core Description & Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-zinc-100">
              
              {/* Left Column (Main study) */}
              <div className="md:col-span-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 mb-2">Project Retrospective</h4>
                <p className="text-xs text-zinc-600 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {selectedProject.caseStudy && (
                  <div className="mb-6">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 mb-2">Technical Case Study</h4>
                    <p className="text-xs text-zinc-600 leading-relaxed bg-zinc-50 p-3.5 rounded-xl border border-zinc-200 whitespace-pre-line">
                      {selectedProject.caseStudy}
                    </p>
                  </div>
                )}

                {selectedProject.id === 'dasheri-shield' && (
                  <div className="mb-6 border-t border-zinc-100 pt-6">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 mb-2">Dasheri Shield Live System Dashboard</h4>
                    <DasheriShieldDashboard />
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-700 mb-3">Key Features Implemented</h4>
                  <ul className="flex flex-col gap-2.5">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column (Specifications) */}
              <div className="md:col-span-1 p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 h-fit">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-pink-600 mb-3">Project Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedProject.technologies.map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono text-zinc-700 bg-white border border-zinc-200/60 px-2.5 py-1 rounded-md shadow-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-3 text-xs border-t border-zinc-200 pt-4 text-zinc-500 font-mono">
                  <div className="flex items-center justify-between">
                    <span>Launched:</span>
                    <span className="text-zinc-800 font-sans font-medium">{selectedProject.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Category:</span>
                    <span className="text-zinc-800 font-sans font-medium">{selectedProject.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Classification:</span>
                    <span className="text-zinc-800 font-sans font-medium">{selectedProject.status}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* CASE STUDY MODAL */}
      {caseStudyProject && (() => {
        const parsed = parseCaseStudy(caseStudyProject.caseStudy);
        return (
          <div 
            id="case-study-modal-root" 
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-md p-4 animate-fade-in"
            onClick={() => setCaseStudyProject(null)}
          >
            <div 
              id="case-study-modal"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl rounded-2xl p-6 text-left relative max-h-[90vh] overflow-y-auto text-zinc-800 flex flex-col gap-6 glass-modal"
            >
              {/* Close Button */}
              <button 
                id="case-study-close-btn"
                onClick={() => setCaseStudyProject(null)}
                className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-xl transition-all cursor-pointer border border-zinc-200 shadow-xs bg-white"
              >
                <X size={18} />
              </button>

              {/* Title Header */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold text-cyan-700 bg-cyan-50 border border-cyan-100 uppercase tracking-wider">
                    {caseStudyProject.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">•</span>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                    {caseStudyProject.date}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 font-sans">
                  Case Study: {caseStudyProject.title}
                </h3>
              </div>

              {/* Image Banner */}
              <div className="h-56 w-full rounded-xl overflow-hidden relative border border-zinc-200 bg-zinc-100">
                <img
                  src={caseStudyProject.imageUrl}
                  alt={caseStudyProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Structured Retrospective Content */}
              <div className="space-y-6">
                {/* 1. Challenge */}
                {parsed.challenge && (
                  <div className="p-5 rounded-xl border border-rose-100 bg-rose-50/20 border-l-4 border-l-rose-500">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-700 mb-2 flex items-center gap-1.5">
                      <AlertCircle size={14} className="text-rose-500" />
                      01 / The Challenge
                    </h4>
                    <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed font-sans font-normal">
                      {parsed.challenge}
                    </p>
                  </div>
                )}

                {/* 2. Solution */}
                {parsed.solution && (
                  <div className="p-5 rounded-xl border border-cyan-100 bg-cyan-50/20 border-l-4 border-l-cyan-500">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-700 mb-2 flex items-center gap-1.5">
                      <Cpu size={14} className="text-cyan-500" />
                      02 / The Solution
                    </h4>
                    <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed font-sans font-normal">
                      {parsed.solution}
                    </p>
                  </div>
                )}

                {/* 3. Outcome */}
                {parsed.outcome && (
                  <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/10 border-l-4 border-l-emerald-500">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 mb-2 flex items-center gap-1.5">
                      <Trophy size={14} className="text-emerald-500" />
                      03 / The Outcome & Achievements
                    </h4>
                    <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed font-sans font-normal">
                      {parsed.outcome}
                    </p>
                  </div>
                )}

                {/* 4. Roadmap */}
                {parsed.roadmap && (
                  <div className="p-5 rounded-xl border border-violet-100 bg-violet-50/10 border-l-4 border-l-violet-500">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-violet-700 mb-2 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-violet-500" />
                      04 / Future Vision & Roadmap
                    </h4>
                    <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed font-sans font-normal">
                      {parsed.roadmap}
                    </p>
                  </div>
                )}

                {/* Fallback Text if non-structured */}
                {parsed.fallbackText && (
                  <div className="p-5 rounded-xl border border-zinc-200 bg-zinc-50/50">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-600 mb-2 flex items-center gap-1.5">
                      <BookOpen size={14} />
                      Project Retrospective Case Study
                    </h4>
                    <p className="text-xs sm:text-[13px] text-zinc-700 leading-relaxed whitespace-pre-line">
                      {parsed.fallbackText}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 pt-5 mt-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black ${
                    caseStudyProject.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {caseStudyProject.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedProject(caseStudyProject);
                      setCaseStudyProject(null);
                    }}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-zinc-600 hover:text-zinc-900 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 transition-all cursor-pointer"
                  >
                    <Activity size={13} />
                    Interactive Specs & Sandbox
                  </button>
                  
                  <button
                    onClick={() => setCaseStudyProject(null)}
                    className="flex-1 sm:flex-initial flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-sm transition-all cursor-pointer"
                  >
                    Done Reading
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      })()}
    </section>
  );
}

// --- CASE STUDY PARSER HELPERS ---
interface ParsedCaseStudy {
  challenge?: string;
  solution?: string;
  outcome?: string;
  roadmap?: string;
  fallbackText?: string;
}

function parseCaseStudy(text?: string): ParsedCaseStudy {
  if (!text) return {};
  
  const result: ParsedCaseStudy = {};
  
  // Find sections
  const problemRegex = /(?:THE PROBLEM|CHALLENGE):?([\s\S]*?)(?=(?:THE SOLUTION|SOLUTION|KEY ACHIEVEMENTS|OUTCOME|FUTURE ROADMAP|$))/i;
  const solutionRegex = /(?:THE SOLUTION|SOLUTION):?([\s\S]*?)(?=(?:THE PROBLEM|CHALLENGE|KEY ACHIEVEMENTS|OUTCOME|FUTURE ROADMAP|$))/i;
  const outcomeRegex = /(?:KEY ACHIEVEMENTS|OUTCOME):?([\s\S]*?)(?=(?:THE PROBLEM|CHALLENGE|THE SOLUTION|SOLUTION|FUTURE ROADMAP|$))/i;
  const roadmapRegex = /(?:FUTURE ROADMAP|ROADMAP):?([\s\S]*?)(?=(?:THE PROBLEM|CHALLENGE|THE SOLUTION|SOLUTION|KEY ACHIEVEMENTS|OUTCOME|$))/i;

  const problemMatch = text.match(problemRegex);
  const solutionMatch = text.match(solutionRegex);
  const outcomeMatch = text.match(outcomeRegex);
  const roadmapMatch = text.match(roadmapRegex);

  if (problemMatch) result.challenge = problemMatch[1].trim();
  if (solutionMatch) result.solution = solutionMatch[1].trim();
  if (outcomeMatch) result.outcome = outcomeMatch[1].trim();
  if (roadmapMatch) result.roadmap = roadmapMatch[1].trim();

  if (!problemMatch && !solutionMatch && !outcomeMatch) {
    result.fallbackText = text;
  }

  return result;
}
