'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, FolderOpen, Heart, MessageSquare, Send, Sparkles } from 'lucide-react';
import { Blog, Comment } from '../../../types';

interface BlogDetailClientProps {
  blog: Blog;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const [likes, setLikes] = useState(blog.likes || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll progress bar
  useEffect(() => {
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch comments
  useEffect(() => {
    fetch(`/api/blogs/${blog.id}/comments`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setComments(data);
      })
      .catch(err => console.error("Error fetching comments:", err));
  }, [blog.id]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetch(`/api/blogs/${blog.id}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.likes !== undefined) setLikes(data.likes);
    } catch (err) {
      console.error("Error liking blog:", err);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentContent.trim() || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      const res = await fetch(`/api/blogs/${blog.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: newCommentName, content: newCommentContent })
      });
      const data = await res.json();
      if (data.success && data.comment) {
        setComments(prev => [data.comment, ...prev]);
        setNewCommentContent('');
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 py-12 px-6">
      {/* SCROLL PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-100/50 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-cyan-600 glass-panel rounded-xl transition mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          <span>Back to Portfolio</span>
        </Link>

        {/* HERO HEADER */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl mb-8 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-4 font-mono">
            <span className="px-3 py-1 bg-cyan-100/80 text-cyan-800 font-bold rounded-lg uppercase tracking-wider flex items-center gap-1">
              <FolderOpen className="w-3.5 h-3.5" />
              {blog.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              {blog.publishedDate}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-4">
            {blog.title}
          </h1>

          <p className="text-base md:text-lg text-zinc-600 leading-relaxed mb-6 font-sans">
            {blog.excerpt}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 pt-2">
            {blog.tags.map((tag, i) => (
              <span key={i} className="text-[11px] font-mono px-2.5 py-1 bg-zinc-200/60 text-zinc-700 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* FEATURED IMAGE */}
        {blog.imageUrl && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-md border border-zinc-200">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-auto max-h-[450px] object-cover"
            />
          </div>
        )}

        {/* BODY CONTENT */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl mb-10 prose prose-zinc max-w-none">
          <div className="text-zinc-700 leading-relaxed whitespace-pre-line text-base font-sans">
            {blog.content}
          </div>
        </div>

        {/* LIKE ACTION */}
        <div className="flex items-center justify-between glass-panel p-6 rounded-2xl mb-12">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                likes > (blog.likes || 0) 
                  ? 'bg-rose-500 text-white shadow-md' 
                  : 'bg-zinc-100 text-zinc-700 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${likes > (blog.likes || 0) ? 'fill-current' : ''}`} />
              <span>{likes} Applauds</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <MessageSquare className="w-4 h-4 text-cyan-500" />
            <span>{comments.length} Discussion Comments</span>
          </div>
        </div>

        {/* COMMENTS SECTION */}
        <div className="glass-panel p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-600" />
            <span>Community Discussion</span>
          </h3>

          <form onSubmit={handleCommentSubmit} className="mb-8 space-y-4">
            <input
              type="text"
              placeholder="Your Name / Handle"
              value={newCommentName}
              onChange={e => setNewCommentName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white/80 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
              required
            />
            <textarea
              placeholder="Share your technical thoughts or questions..."
              value={newCommentContent}
              onChange={e => setNewCommentContent(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white/80 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
              required
            />
            <button
              type="submit"
              disabled={isSubmittingComment}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:opacity-90 transition flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </button>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 rounded-xl bg-white/60 border border-zinc-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-zinc-800">{comment.userName}</span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
