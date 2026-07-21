/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, Heart, MessageSquare, Calendar, FolderOpen, ArrowLeft, Send, Sparkles, Plus, AlertCircle, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Blog, Comment } from '../types';

interface BlogProps {
  blogs: Blog[];
  isAdmin: boolean;
  onDeleteBlog?: (id: string) => void;
  onEditBlog?: (b: Blog) => void;
}

export default function BlogCMS({ blogs, isAdmin, onDeleteBlog, onEditBlog }: BlogProps) {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Agri-Tech' | 'Computer Science' | 'Web Development'>('All');
  const [isLiking, setIsLiking] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track page scroll for reading progress bar
  useEffect(() => {
    if (!selectedBlog) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const progress = (scrollPosition / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [selectedBlog]);

  // Fetch comments when a blog post is expanded
  useEffect(() => {
    if (!selectedBlog) return;
    
    fetch(`/api/blogs/${selectedBlog.id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error("Error fetching comments:", err));
  }, [selectedBlog]);

  const handleLike = async (e: React.MouseEvent, blogId: string) => {
    e.stopPropagation();
    if (isLiking) return;
    setIsLiking(true);

    try {
      const res = await fetch(`/api/blogs/${blogId}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        if (selectedBlog && selectedBlog.id === blogId) {
          setSelectedBlog({ ...selectedBlog, likes: data.likes });
        }
        // Also update in parent state list if necessary, but we can update local copy
        const blog = blogs.find(b => b.id === blogId);
        if (blog) blog.likes = data.likes;
      }
    } catch (err) {
      console.error("Error liking blog:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBlog || !commentName.trim() || !commentText.trim()) return;

    try {
      const res = await fetch(`/api/api/blogs/${selectedBlog.id}/comments` /* Support both base paths */, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: commentName, content: commentText })
      }).then(r => r.ok ? r : fetch(`/api/blogs/${selectedBlog.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: commentName, content: commentText })
      }));

      const data = await res.json();
      if (data.success) {
        setComments([...comments, data.comment]);
        setCommentText('');
        
        // Update comments count locally
        selectedBlog.commentsCount = (selectedBlog.commentsCount || 0) + 1;
        const blog = blogs.find(b => b.id === selectedBlog.id);
        if (blog) blog.commentsCount = selectedBlog.commentsCount;
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  // Filters & Search
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Agri-Tech', 'Computer Science', 'Web Development'];

  // Detail expanded reading screen
  if (selectedBlog) {
    return (
      <section id="blog-details-section" className="py-24 px-6 max-w-4xl mx-auto">
        {/* SCROLL PROGRESS BAR */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-100/50 z-50">
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* BACK TO OVERVIEW */}
        <button
          onClick={() => setSelectedBlog(null)}
          className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-500 hover:text-zinc-900 mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to Articles
        </button>

        {/* HERO HEADER */}
        <div className="rounded-2xl overflow-hidden h-[340px] border border-zinc-200 relative mb-8">
          <img
            src={selectedBlog.imageUrl}
            alt={selectedBlog.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-bold text-cyan-200 bg-cyan-950/80 border border-cyan-800">
              {selectedBlog.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mt-4 tracking-tight leading-tight">
              {selectedBlog.title}
            </h1>
            <div className="flex items-center gap-4 mt-3 text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {selectedBlog.publishedDate}
              </span>
              <span className="flex items-center gap-1">
                <FolderOpen size={12} />
                {selectedBlog.category}
              </span>
            </div>
          </div>
        </div>

        {/* TYPOGRAPHY ARTICLE CONTENT */}
        <article className="prose prose-zinc max-w-none text-zinc-800 text-sm leading-relaxed mb-12 p-6 sm:p-8 rounded-2xl glass-panel">
          {/* Simple paragraph/bullet rendering since we store raw content or simple markdown */}
          <div className="whitespace-pre-wrap flex flex-col gap-4 font-sans">
            {selectedBlog.content.split('\n\n').map((para, i) => {
              if (para.startsWith('## ')) {
                return <h2 key={i} className="text-xl font-bold text-zinc-900 tracking-tight mt-6 mb-2 border-b border-zinc-100 pb-2">{para.substring(3)}</h2>;
              }
              if (para.startsWith('### ')) {
                return <h3 key={i} className="text-base font-bold text-zinc-900 tracking-tight mt-4 mb-2">{para.substring(4)}</h3>;
              }
              if (para.startsWith('- ') || para.startsWith('* ')) {
                return (
                  <ul key={i} className="list-disc pl-5 flex flex-col gap-1.5 text-zinc-700">
                    {para.split('\n').map((li, j) => (
                      <li key={j}>{li.substring(2)}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i}>{para}</p>;
            })}
          </div>

          {/* Social Stats & Like triggers */}
          <div className="flex items-center gap-4 border-t border-zinc-100 pt-6 mt-8">
            <button
              onClick={(e) => handleLike(e, selectedBlog.id)}
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-pink-700 hover:text-pink-800 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-200 transition-all cursor-pointer"
            >
              <Heart size={14} className={selectedBlog.likes > 20 ? 'fill-pink-600 text-pink-600' : ''} />
              <span>{selectedBlog.likes} Likes</span>
            </button>
            <span className="text-xs font-mono text-zinc-500">
              Tags: {selectedBlog.tags.map(t => `#${t}`).join(', ')}
            </span>
          </div>
        </article>

        {/* COMMENTS THREAD SYSTEM */}
        <section className="border-t border-zinc-100 pt-10">
          <h3 className="text-lg font-black text-zinc-900 font-sans flex items-center gap-2 mb-6">
            <MessageSquare size={18} className="text-cyan-600" />
            Critiques & Comments ({comments.length})
          </h3>

          <div className="flex flex-col gap-4 mb-8">
            {comments.map((comment) => (
              <div 
                key={comment.id}
                className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs"
              >
                <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-zinc-500">
                  <span className="font-bold text-zinc-900">{comment.userName}</span>
                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-zinc-700 leading-relaxed font-sans">{comment.content}</p>
              </div>
            ))}
            {comments.length === 0 && (
              <p className="text-xs font-mono text-zinc-400 text-center uppercase tracking-wider py-4">No comments posted yet. Be the first!</p>
            )}
          </div>

          {/* ADD COMMENT FORM */}
          <form onSubmit={handleCommentSubmit} className="p-5 rounded-2xl glass-panel">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-600 mb-4">Post a Critique</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Recruiter / Tech Lead"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-white text-zinc-900 border border-zinc-200 focus:border-cyan-500/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Message</label>
              <textarea
                required
                rows={4}
                placeholder="Share your feedback, queries, or critiques about Ashfaq's projects/articles..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white text-zinc-900 border border-zinc-200 focus:border-cyan-500/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 resize-none"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Send size={12} />
              Submit Comment
            </button>
          </form>
        </section>
      </section>
    );
  }

  // Blog list overview
  return (
    <section id="blog-section" className="py-24 px-6 max-w-6xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <h2 id="blog-title" className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-emerald-600">CMS Blog</span>
        </h2>
        <div className="w-16 h-1.5 bg-emerald-500 mx-auto rounded-full mt-4" />
        <p className="text-xs font-mono text-zinc-400 mt-3 uppercase tracking-widest">
          Insights on sustainable systems, data mapping, and lower-level code
        </p>
      </div>

      {/* FILTER PANEL */}
      <div 
        id="blog-controls"
        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl mb-10 glass-panel"
      >
        <div className="relative flex-1 w-full">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search articles, topics, and technical terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-900 border border-zinc-200 focus:border-cyan-500/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${
                selectedCategory === cat
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-transparent text-zinc-500 border-transparent hover:text-zinc-950 hover:bg-zinc-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* BLOG GRID */}
      {filteredBlogs.length > 0 ? (
        <div id="blog-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              id={`blog-card-${blog.id}`}
              onClick={() => setSelectedBlog(blog)}
              className="group rounded-2xl overflow-hidden flex flex-col h-full relative cursor-pointer glass-panel glass-panel-hover"
            >
              <div className="h-44 w-full overflow-hidden relative bg-zinc-100 border-b border-zinc-200">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                  {blog.category}
                </span>
                {blog.isFeatured && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold text-yellow-700 bg-yellow-50 border border-yellow-200 flex items-center gap-1">
                    <Sparkles size={8} />
                    Featured
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 mb-1.5 block">{blog.publishedDate}</span>
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-1">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-100 pt-3 mt-1 text-[11px] font-bold text-zinc-500">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleLike(e, blog.id)}
                      className="flex items-center gap-1 hover:text-pink-600 transition-colors"
                    >
                      <Heart size={12} />
                      <span>{blog.likes}</span>
                    </button>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={12} />
                      <span>{blog.commentsCount}</span>
                    </span>
                  </div>
                  <span className="text-emerald-600 group-hover:text-emerald-700">Read Post →</span>
                </div>
              </div>

              {/* Admin overlays for deletion */}
              {isAdmin && (
                <div className="absolute top-2 left-2 flex gap-1 z-20" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onEditBlog && onEditBlog(blog)}
                    className="p-1.5 rounded-lg bg-blue-500 text-white text-[10px] font-bold hover:bg-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteBlog && onDeleteBlog(blog.id)}
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
        <div id="blog-empty" className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-200 rounded-2xl bg-zinc-50 text-center">
          <AlertCircle className="text-zinc-400 mb-3" size={28} />
          <p className="text-xs font-mono text-zinc-500">No blog posts found matching current queries</p>
        </div>
      )}
    </section>
  );
}
