import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar, FolderOpen } from 'lucide-react';
import { db } from '../../../server/db/index';

export const metadata: Metadata = {
  title: 'Engineering Blogs & Insights | Mohd. Ashfaq Khan',
  description: 'Technical articles, computer science tutorials, and Agri-Tech hackathon engineering logs written by Mohd. Ashfaq Khan.',
  openGraph: {
    title: 'Engineering Blogs & Articles | Mohd. Ashfaq Khan',
    description: 'Read technical insights on Data Structures, Web Applications, and Agri-Tech software engineering.',
  },
};

export default function BlogListingPage() {
  const blogs = db.getBlogs();

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
            <BookOpen className="w-3.5 h-3.5" />
            <span>TECHNICAL WRITING</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight mb-3">
            Engineering Insights & Technical Articles
          </h1>
          <p className="text-zinc-600 text-base max-w-2xl">
            Articles covering real-world hackathon executions, software architecture patterns, data structures in C/Python, and full-stack development.
          </p>
        </div>

        <div className="grid gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="glass-panel p-6 md:p-8 rounded-2xl hover:border-cyan-300 transition group">
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-3 font-mono">
                <span className="px-2.5 py-0.5 bg-cyan-100/80 text-cyan-800 font-bold rounded">
                  {blog.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {blog.publishedDate}
                </span>
              </div>

              <h2 className="text-xl font-bold text-zinc-900 group-hover:text-cyan-600 transition mb-2">
                <Link href={`/blog/${blog.id}`}>
                  {blog.title}
                </Link>
              </h2>

              <p className="text-zinc-600 text-sm mb-4 line-clamp-2">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-2">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-200/60 text-zinc-600 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/blog/${blog.id}`} 
                  className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                >
                  Read Article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
