'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ThreeCanvas from './components/ThreeCanvas';
import SectionDivider from './components/SectionDivider';
import ResumeModal from './components/ResumeModal';
import { Experience } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showAdmin, setShowAdmin] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setCurrentUser(data.user);
          }
        }
      } catch (err) {
        // Silent fail if backend offline
      }
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    setCurrentUser(null);
  };

  const experiences: Experience[] = [
    {
      id: 'edu-1',
      title: 'B.Tech in Computer Science & Engineering',
      organization: 'Shri Ramswaroop Memorial University',
      company: 'Expected 2027 | CGPA: 6.54 / 10',
      period: '2023 - 2027',
      type: 'education',
      description: 'Strengthening Data Structures & Algorithms (DSA), C Programming, Python, Web Engineering, and System Design concepts. Actively participating in university hackathons and collaborative coding projects.'
    },
    {
      id: 'edu-2',
      title: 'Class XII (ISC)',
      organization: 'S.T. Dominic Savio College, Lucknow',
      company: 'Score: 57%',
      period: '2022',
      type: 'education',
      description: 'Completed senior secondary education under the ISC board with focus on Science and Mathematics.'
    },
    {
      id: 'edu-3',
      title: 'Class X (CISCE)',
      organization: 'S.T. Dominic Savio College, Lucknow',
      company: 'Score: 71.4%',
      period: '2020',
      type: 'education',
      description: 'Completed high school education under the CISCE board with distinction in computer applications.'
    },
    {
      id: 'ach-1',
      title: 'University Hackathon Finalist — Top 15 of 44 Teams',
      organization: 'University Innovation Challenge',
      company: 'Agri-Tech Solutions Division',
      period: '2026',
      type: 'achievement',
      description: 'Ranked in the top 15 out of 44 competing teams for solution design and execution. Developed and presented "Dasheri Shield (AamRakshak)", a mobile-first Agri-Tech web app for disease identification and direct farmer-to-buyer sales.'
    },
    {
      id: 'work-1',
      title: 'Agri-Tech Frontend Developer — Dasheri Shield (AamRakshak)',
      organization: 'AgriTech Hackathon Prototype',
      company: 'Mobile-First SPA & Edge AI Simulation',
      period: '2026',
      type: 'work',
      description: [
        'Developed a mobile-first frontend web app (HTML5, CSS3, ES6+ Vanilla JS) targeting the Malihabad mango-farming belt for low-bandwidth 2G/3G networks.',
        'Features simulated Edge AI crop disease identification, client-side inventory shelf-life risk alerts, bilingual (English/Hindi) high-contrast UI, and direct farmer-to-buyer tel: marketplace links.'
      ]
    }
  ];

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(`${section}-section`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    setIsResumeModalOpen(true);
    // Also trigger instant file download for seamless UX
    const link = document.createElement('a');
    link.href = '/Mohd_Ashfaq_Khan_Resume.html';
    link.download = 'Mohd_Ashfaq_Khan_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900 selection:bg-cyan-500 selection:text-white">
      {/* THREE.JS WEBGL PARTICLES BACKDROP */}
      <ThreeCanvas />

      {/* NAVBAR */}
      <Navbar 
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAdmin={() => setShowAdmin(true)}
      />

      {/* HERO */}
      <Hero 
        onNavigate={handleNavigate}
        onDownloadResume={handleDownloadResume}
        settings={{}}
      />

      {/* MAIN CONTENT SECTIONS */}
      <main className="space-y-6">
        {[
          {
            id: 'about',
            divider: <SectionDivider icon="sparkles" label="01. Developer Profile" />,
            component: <About experiences={experiences} onDownloadResume={handleDownloadResume} />
          },
          {
            id: 'skills',
            divider: <SectionDivider icon="orbit" label="02. Skill Galaxy" />,
            component: <Skills />
          },
          {
            id: 'projects',
            divider: <SectionDivider icon="code" label="03. Engineering Projects" />,
            component: <Projects />
          },
          {
            id: 'blog',
            divider: <SectionDivider icon="zap" label="04. Technical Writing" />,
            component: <Blog />
          },
          {
            id: 'gallery',
            divider: <SectionDivider icon="sparkles" label="05. Activity Highlights" />,
            component: <Gallery />
          },
          {
            id: 'testimonials',
            divider: <SectionDivider icon="orbit" label="06. Peer Testimonials" />,
            component: <Testimonials />
          },
          {
            id: 'contact',
            divider: <SectionDivider icon="code" label="07. Get In Touch" />,
            component: <Contact />
          }
        ].map((section, idx) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            style={{ willChange: "transform, opacity" }}
            transition={{ 
              duration: 0.6, 
              delay: (idx % 2) * 0.08, 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            {section.divider}
            {section.component}
          </motion.div>
        ))}
      </main>

      {/* FOOTER */}
      <Footer />

      {/* ADMIN DASHBOARD MODAL */}
      {showAdmin && (
        <AdminDashboard 
          currentUser={currentUser}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout}
          onClose={() => setShowAdmin(false)} 
        />
      )}

      {/* RESUME VIEWER & DOWNLOAD MODAL */}
      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </div>
  );
}
