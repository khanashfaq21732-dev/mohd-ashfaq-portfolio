'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Printer, FileText, CheckCircle2, ExternalLink, Sparkles, Copy, Award, GraduationCap, Briefcase, Phone, Mail, Github, Linkedin, Globe } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleDownloadHtml = () => {
    const link = document.createElement('a');
    link.href = '/Mohd_Ashfaq_Khan_Resume.html';
    link.download = 'Mohd_Ashfaq_Khan_Resume.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadTxt = () => {
    const link = document.createElement('a');
    link.href = '/Mohd_Ashfaq_Khan_Resume.txt';
    link.download = 'Mohd_Ashfaq_Khan_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPdf = () => {
    const printWindow = window.open('/Mohd_Ashfaq_Khan_Resume.html', '_blank');
    if (printWindow) {
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const handleCopyText = () => {
    const resumeText = `MOHD. ASHFAQ KHAN
Phone: +91-6387046100 | Email: khanashfaq21732@gmail.com
LinkedIn: https://linkedin.com | GitHub: https://github.com/khanashfaq21732-dev

PROFESSIONAL SUMMARY
Computer Science undergraduate (B.Tech, expected 2027) with foundational skills in C and Python, and hands-on frontend development experience using HTML5, CSS3, and JavaScript. Built and presented a full working prototype — an Agri-Tech crop-monitoring and inventory system — that ranked top 15 of 44 teams at a university hackathon. Actively strengthening Data Structures & Algorithms and problem-solving ability.

CORE COMPETENCIES
C Programming • Python • HTML5 • CSS3 • JavaScript • Data Structures & Algorithms (DSA) • Responsive Web Design • Modular Programming • VS Code • Google Colab • Problem Solving • Debugging • Frontend Development • Web Application Prototyping

PROJECTS
Agri-Tech System – The Dasheri Shield
Web-based inventory and crop disease monitoring prototype
● Engineered a responsive frontend for crop-disease monitoring and inventory prototype using HTML5, CSS3, and JavaScript.
● Structured data-handling logic to simulate real-time crop health tracking and digital storage records.
● Applied modular programming principles to improve code maintainability and scalability across prototype.
● Digitized manual tracking workflows, improving simulated logging efficiency by ~30%.
● Competed among 44 university teams, placing in top 15 for solution design and execution.

Personal Portfolio Website – AI Studio, Next.js, React.js, Tailwind CSS
● Developed a modern, fully responsive personal portfolio website to showcase projects, technical skills, achievements, and experience.
● Designed interactive, mobile-first UI with reusable React components and responsive layouts.

EDUCATION
● B.Tech in Computer Science — Shri Ramswaroop Memorial University (Expected 2027), CGPA: 6.54/10
● Class XII (ISC) — S.T. Dominic Savio College — 57%
● Class X (CISCE) — S.T. Dominic Savio College — 71.4%

ACHIEVEMENTS
● Ranked top 15 out of 44 teams in University Hackathon Competition.
● Developed and presented a real-world Agri-Tech solution under competitive timelines.`;

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* HEADER BAR */}
          <div className="p-6 bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 flex-shrink-0">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-1 border border-cyan-500/30">
                <Sparkles size={12} /> Official Resume Document
              </div>
              <h2 className="text-xl font-black tracking-tight font-sans">Mohd. Ashfaq Khan — Resume</h2>
              <p className="text-xs text-zinc-400 font-mono">B.Tech Computer Science (Expected 2027)</p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handlePrintPdf}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-mono font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer size={14} />
                <span>Save PDF</span>
              </button>

              <button
                onClick={handleDownloadHtml}
                className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-zinc-700"
                title="Download HTML Resume"
              >
                <Download size={14} />
                <span>Download .HTML</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-zinc-700"
                title="Download Text Resume"
              >
                <FileText size={14} />
                <span>Download .TXT</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer ml-1"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* RESUME DOCUMENT DISPLAY BODY */}
          <div className="p-6 md:p-10 overflow-y-auto space-y-6 text-zinc-800 font-sans text-sm leading-relaxed flex-1">
            
            {/* DOCUMENT HEADER */}
            <div className="text-center pb-6 border-b-2 border-zinc-900 space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-zinc-900 uppercase">Mohd. Ashfaq Khan</h1>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-600">
                <span className="flex items-center gap-1"><Phone size={12} className="text-cyan-600" /> +91-6387046100</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Mail size={12} className="text-cyan-600" /> khanashfaq21732@gmail.com</span>
                <span>•</span>
                <a href="https://github.com/khanashfaq21732-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-cyan-600 hover:underline">
                  <Github size={12} /> GitHub
                </a>
              </div>
            </div>

            {/* PROFESSIONAL SUMMARY */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Professional Summary
              </h3>
              <p className="text-xs text-zinc-700 leading-relaxed">
                Computer Science undergraduate (B.Tech, expected 2027) with foundational skills in C and Python, and hands-on frontend development experience using HTML5, CSS3, and JavaScript. Built and presented a full working prototype — an Agri-Tech crop-monitoring and inventory system — that ranked top 15 of 44 teams at a university hackathon. Actively strengthening Data Structures & Algorithms and problem-solving ability, with a demonstrated track record of converting academic concepts into functioning, real-world applications. Seeking an entry-level software or frontend development role, or internship, to apply and grow these skills in a production environment.
              </p>
            </div>

            {/* CORE COMPETENCIES */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Core Competencies
              </h3>
              <p className="text-xs font-mono text-zinc-800 leading-relaxed">
                C Programming • Python • HTML5 • CSS3 • JavaScript • Data Structures & Algorithms (DSA) • Responsive Web Design • Modular Programming • VS Code • Google Colab • Problem Solving • Debugging • Frontend Development • Web Application Prototyping
              </p>
            </div>

            {/* PROJECTS */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Projects
              </h3>
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline font-bold text-sm text-zinc-900">
                  <span>Agri-Tech System – The Dasheri Shield</span>
                </div>
                <p className="text-xs italic text-zinc-500 font-mono">Web-based inventory and crop disease monitoring prototype</p>
                <ul className="list-disc pl-5 text-xs text-zinc-700 space-y-1">
                  <li>Engineered a responsive frontend for a crop-disease monitoring and inventory prototype using HTML5, CSS3, and JavaScript.</li>
                  <li>Structured data-handling logic to simulate real-time crop health tracking and digital storage records.</li>
                  <li>Applied modular programming principles to improve code maintainability and scalability across the prototype.</li>
                  <li>Digitized manual tracking workflows, improving simulated logging efficiency by approximately 30%.</li>
                  <li>Competed among 44 university teams, placing in the top 15 for solution design and execution.</li>
                </ul>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between items-baseline font-bold text-sm text-zinc-900">
                  <span>Personal Portfolio Website – AI Studio, Next.js, React.js, Tailwind CSS</span>
                </div>
                <p className="text-xs italic text-zinc-500 font-mono">AI-assisted personal portfolio and project showcase website</p>
                <ul className="list-disc pl-5 text-xs text-zinc-700 space-y-1">
                  <li>Developed a modern, fully responsive personal portfolio website using AI Studio, Next.js, React.js, and Tailwind CSS to showcase projects, technical skills, achievements, certifications, and professional experience.</li>
                  <li>Designed an interactive, mobile-first user interface with reusable React components, smooth navigation, and responsive layouts for seamless cross-device compatibility.</li>
                  <li>Leveraged AI-assisted development workflows and modern UI tools to accelerate development while maintaining high code quality, accessibility, SEO, and optimized performance.</li>
                  <li>Integrated project showcase, resume, GitHub, LinkedIn, and contact sections to establish a professional online presence.</li>
                </ul>
              </div>
            </div>

            {/* TECHNICAL DEVELOPMENT */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Technical Development
              </h3>
              <ul className="list-disc pl-5 text-xs text-zinc-700 space-y-1">
                <li>Actively practicing Data Structures & Algorithms to strengthen problem-solving ability.</li>
                <li>Participated in university-level hackathons and collaborative coding projects.</li>
                <li>Continuously learning backend fundamentals and system design concepts.</li>
              </ul>
            </div>

            {/* EDUCATION */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Education
              </h3>
              <div className="space-y-1 text-xs text-zinc-800">
                <p><strong>B.Tech in Computer Science</strong> — Shri Ramswaroop Memorial University (Expected 2027), CGPA: 6.54/10</p>
                <p><strong>Class XII (ISC)</strong> — S.T. Dominic Savio College — 57%</p>
                <p><strong>Class X (CISCE)</strong> — S.T. Dominic Savio College — 71.4%</p>
              </div>
            </div>

            {/* ACHIEVEMENTS */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Achievements
              </h3>
              <ul className="list-disc pl-5 text-xs text-zinc-700 space-y-1">
                <li>Ranked top 15 out of 44 teams in University Hackathon Competition.</li>
                <li>Developed and presented a real-world Agri-Tech solution under competitive timelines.</li>
              </ul>
            </div>

            {/* ADDITIONAL INTERESTS */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Additional Interests
              </h3>
              <p className="text-xs text-zinc-700">
                Video editing and content creation; enjoys applying creative and communication skills alongside technical work.
              </p>
            </div>

          </div>

          {/* FOOTER ACTIONS BAR */}
          <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono flex-shrink-0">
            <button
              onClick={handleCopyText}
              className="px-4 py-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer w-full sm:w-auto justify-center"
            >
              {copied ? <CheckCircle2 size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Text Version'}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrintPdf}
                className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <Printer size={14} />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
