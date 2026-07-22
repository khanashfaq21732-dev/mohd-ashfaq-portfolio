'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Calendar, Cpu, Layers } from 'lucide-react';
import { Project } from '../../../types';

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 py-12 px-6">
      <div className="max-w-4xl mx-auto pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-cyan-600 glass-panel rounded-xl transition mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          <span>Back to Portfolio</span>
        </Link>

        {/* HERO HEADER */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-4 font-mono">
            <span className="px-3 py-1 bg-cyan-100/80 text-cyan-800 font-bold rounded-lg uppercase tracking-wider">
              {project.category}
            </span>
            <span className="px-3 py-1 bg-emerald-100/80 text-emerald-800 font-bold rounded-lg uppercase tracking-wider">
              {project.status}
            </span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Calendar className="w-3.5 h-3.5" />
              {project.date}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Interactive Demo</span>
              </a>
            )}
            {project.gitHubUrl && (
              <a
                href={project.gitHubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>Source Code Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* IMAGE PREVIEW */}
        {project.imageUrl && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-md border border-zinc-200">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-auto max-h-[450px] object-cover"
            />
          </div>
        )}

        {/* TECHNOLOGIES STACK */}
        <div className="glass-panel p-8 rounded-3xl mb-8">
          <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-600" />
            <span>Technologies & Engineering Stack</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="px-3 py-1.5 bg-zinc-200/80 text-zinc-800 text-xs font-mono font-medium rounded-lg">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CORE FEATURES */}
        <div className="glass-panel p-8 rounded-3xl mb-8">
          <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-600" />
            <span>Key Engineering Highlights</span>
          </h3>
          <ul className="space-y-3">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CASE STUDY */}
        {project.caseStudy && (
          <div className="glass-panel p-8 md:p-12 rounded-3xl mb-8">
            <h3 className="text-xl font-extrabold text-zinc-900 mb-6">
              Engineering Case Study & Problem/Solution Breakdown
            </h3>
            <div className="text-zinc-700 leading-relaxed whitespace-pre-line text-sm md:text-base font-sans">
              {project.caseStudy}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
