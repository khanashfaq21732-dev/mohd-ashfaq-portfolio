/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import ThreeCanvas from './components/ThreeCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import BlogCMS from './components/Blog';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import SubscribeForm from './components/SubscribeForm';
import { Project, Blog, Skill, Experience, Testimonial, GalleryItem, SystemSettings } from './types';
import { Sparkles, Terminal } from 'lucide-react';

export default function App() {
  // --- CORE STATE ---
  const [activeSection, setActiveSection] = useState('home');
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- DATA STATES ---
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  // --- RE-FETCH UTILITY ---
  const loadPortfolioData = () => {
    Promise.all([
      fetch('/api/settings').then(res => res.json()),
      fetch('/api/projects').then(res => res.json()),
      fetch('/api/blogs').then(res => res.json()),
      fetch('/api/skills').then(res => res.json()),
      fetch('/api/experiences').then(res => res.json()),
      fetch('/api/testimonials').then(res => res.json()),
      fetch('/api/gallery').then(res => res.json())
    ])
    .then(([settingsData, projectsData, blogsData, skillsData, expData, testData, galData]) => {
      setSettings(settingsData);
      setProjects(projectsData);
      setBlogs(blogsData);
      setSkills(skillsData);
      setExperiences(expData);
      setTestimonials(testData);
      setGallery(galData);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error("Critical error parsing full-stack database APIs:", err);
      setIsLoading(false);
    });
  };

  // --- INITIALIZATION MOUNT ---
  useEffect(() => {
    // 1. Fetch data
    loadPortfolioData();

    // 2. Validate current auth session
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    const authHeaders: Record<string, string> = storedToken ? { 'Authorization': `Bearer ${storedToken}` } : {};

    fetch('/api/auth/me', { headers: authHeaders })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(err => console.error("Session check skipped:", err));

    // 3. Register visitor analytics log to Recharts database
    fetch('/api/analytics/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referrer: document.referrer || 'Direct Entry / Recruiter' })
    }).catch(err => console.error("Analytics log bypassed:", err));
  }, []);

  // --- INTERSECTION OBSERVER FOR ACTIVE SECTION HIGHLIGHTS ---
  useEffect(() => {
    const sections = ['hero-section', 'about-section', 'skills-section', 'projects-section', 'blog-section', 'gallery-section', 'testimonials-section', 'contact-section'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200; // Offset
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            let mappedId = 'home';
            if (sectionId === 'about-section') mappedId = 'about';
            else if (sectionId === 'skills-section') mappedId = 'skills';
            else if (sectionId === 'projects-section') mappedId = 'projects';
            else if (sectionId === 'blog-section') mappedId = 'blog';
            else if (sectionId === 'gallery-section') mappedId = 'gallery';
            else if (sectionId === 'testimonials-section') mappedId = 'testimonials';
            else if (sectionId === 'contact-section') mappedId = 'contact';
            
            setActiveSection(mappedId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- NAVIGATION ACTION ---
  const handleNavigate = (sectionId: string) => {
    let targetElId = 'hero-section';
    if (sectionId === 'about') targetElId = 'about-section';
    else if (sectionId === 'skills') targetElId = 'skills-section';
    else if (sectionId === 'projects') targetElId = 'projects-section';
    else if (sectionId === 'blog') targetElId = 'blog-section';
    else if (sectionId === 'gallery') targetElId = 'gallery-section';
    else if (sectionId === 'testimonials') targetElId = 'testimonials-section';
    else if (sectionId === 'contact') targetElId = 'contact-section';

    const el = document.getElementById(targetElId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  // --- RESUME DOWNLOAD ACTION ---
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/api/resume/download';
    link.setAttribute('download', 'Resume_Mohd_Ashfaq_Khan.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setCurrentUser(null);
      setShowAdmin(false);
    } catch (e) {
      console.error(e);
    }
  };

  // --- LOADING FALLBACK COVER ---
  if (isLoading || !settings) {
    return (
      <div 
        id="app-loader-root" 
        className="fixed inset-0 z-50 bg-zinc-50 flex flex-col items-center justify-center text-center gap-4 text-zinc-900"
      >
        <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-cyan-500 animate-spin flex items-center justify-center shadow-md">
          <span className="font-mono text-[10px] font-black text-cyan-600">MAK</span>
        </div>
        <div>
          <h2 className="text-sm font-black tracking-widest uppercase font-sans text-zinc-800 flex items-center justify-center gap-1.5">
            Loading Portfolio
          </h2>
          <p className="text-[10px] font-mono text-zinc-500 mt-1 uppercase tracking-widest">Preparing Mohd. Ashfaq Khan's projects & milestones...</p>
        </div>
      </div>
    );
  }

  // --- PORTFOLIO PRESENTATION LAYOUT ---
  return (
    <div id="portfolio-app-shell" className="relative min-h-screen text-zinc-800 selection:bg-cyan-100 selection:text-cyan-950 bg-zinc-50">
      
      {/* 3D CANVAS BACKGROUND */}
      <ThreeCanvas interactive={true} />

      {/* FLOATING HEADER NAVBAR */}
      <Navbar 
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAdmin={() => setShowAdmin(true)}
      />

      {/* VIEWPORT CANVAS SECTIONS CONTAINER */}
      <main id="portfolio-sections-container">
        
        {/* HERO SECTION */}
        <Hero 
          onNavigate={handleNavigate}
          onDownloadResume={handleDownloadResume}
          settings={settings}
        />

        {/* ABOUT & TIMELINE Milestones */}
        <About 
          experiences={experiences}
          onDownloadResume={handleDownloadResume}
        />

        {/* SKILLS GALAXY MAP */}
        <Skills skills={skills} />

        {/* CURATED CURRICULUM PROJECTS SYSTEM */}
        <Projects 
          projects={projects}
          isAdmin={currentUser?.role === 'admin'}
          onDeleteProject={(id) => {}}
          onEditProject={(p) => {}}
        />

        {/* ADVANCED CMS BLOG SYSTEM */}
        <BlogCMS 
          blogs={blogs}
          isAdmin={currentUser?.role === 'admin'}
        />

        {/* GALLERY ITEMS CREDENTIALS */}
        <Gallery 
          gallery={gallery}
          isAdmin={currentUser?.role === 'admin'}
        />

        {/* REVIEWS TESTIMONIAL CAROUSEL */}
        <Testimonials testimonials={testimonials} />

        {/* CONNECT CHANNELS FORM */}
        <Contact settings={settings} />

      </main>

      {/* SYSTEM ADMINISTRATIVE OVERLAYS */}
      {showAdmin && (
        <AdminDashboard 
          onClose={() => setShowAdmin(false)}
          currentUser={currentUser}
          onLogin={(u) => setCurrentUser(u)}
          onLogout={handleLogout}
          projects={projects}
          blogs={blogs}
          settings={settings}
          onReloadData={loadPortfolioData}
        />
      )}

      {/* FOOTER CREDENTIALS */}
      <footer id="portfolio-main-footer" className="py-12 border-t border-zinc-200 bg-white/70 font-sans text-[11px] text-zinc-500 z-10 relative">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-left max-w-sm">
            <p className="font-bold text-zinc-800 text-xs">Mohd. Ashfaq Khan</p>
            <p>© {new Date().getFullYear()} Mohd. Ashfaq Khan. Dedicated to crafting practical software solutions.</p>
            <div className="flex items-center gap-3 mt-1 text-[10px]">
              <span className="text-cyan-600">● React & Tailwind CSS</span>
              <span>● Node.js Platform</span>
            </div>
          </div>
          
          <SubscribeForm />
        </div>
      </footer>

    </div>
  );
}
