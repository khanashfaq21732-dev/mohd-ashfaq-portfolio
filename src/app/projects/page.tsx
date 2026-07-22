import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Calendar, Cpu, ExternalLink } from 'lucide-react';
import { db } from '../../../server/db/index';

export const metadata: Metadata = {
  title: 'Engineering Projects & Case Studies | Mohd. Ashfaq Khan',
  description: 'Full-stack web applications, Agri-Tech monitoring systems, and software engineering solutions built by Mohd. Ashfaq Khan.',
  openGraph: {
    title: 'Software Projects & Case Studies | Mohd. Ashfaq Khan',
    description: 'Explore full-stack applications, Agri-Tech innovations, and software engineering case studies.',
  },
};

export default function ProjectsListingPage() {
  const projects = db.getProjects();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 py-12 px-6">
      <div className="max-w-4xl mx-auto pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-cyan-600 glass-panel rounded-xl transition mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          <span>Back to Home Portfolio</span>
        </Link>

        <div className="glass-panel p-8 md:p-12 rounded-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold font-mono mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight mb-3">
            Engineering Projects & Innovations
          </h1>
          <p className="text-zinc-600 text-base max-w-2xl">
            Detailed case studies and applications spanning Agri-Tech IoT monitoring, web platforms, and software tools.
          </p>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project.id} className="glass-panel p-6 md:p-8 rounded-2xl hover:border-cyan-300 transition group">
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-3 font-mono">
                <span className="px-2.5 py-0.5 bg-cyan-100/80 text-cyan-800 font-bold rounded">
                  {project.category}
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-100/80 text-emerald-800 font-bold rounded">
                  {project.status}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.date}
                </span>
              </div>

              <h2 className="text-xl font-bold text-zinc-900 group-hover:text-cyan-600 transition mb-2">
                <Link href={`/projects/${project.id}`}>
                  {project.title}
                </Link>
              </h2>

              <p className="text-zinc-600 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-200/60 text-zinc-700 rounded">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60">
                <Link 
                  href={`/projects/${project.id}`} 
                  className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                >
                  View Case Study →
                </Link>

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 flex items-center gap-1"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
