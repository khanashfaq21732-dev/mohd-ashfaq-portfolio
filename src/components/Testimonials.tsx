/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto sliding carousel
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const activeTest = testimonials[activeIndex];

  return (
    <section id="testimonials-section" className="py-24 px-6 max-w-4xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <h2 id="testimonials-title" className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          Evaluator <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Endorsements</span>
        </h2>
        <div className="w-16 h-1.5 bg-purple-500 mx-auto rounded-full mt-4" />
        <p className="text-xs font-mono text-zinc-400 mt-3 uppercase tracking-widest">
          What mentors and team peers write about my technical focus
        </p>
      </div>

      {/* CAROUSEL SLIDER CARD DECK */}
      <div 
        id="testimonials-deck"
        className="p-6 sm:p-10 rounded-2xl relative overflow-hidden glass-panel"
      >
        {/* Floating background quotation marks */}
        <Quote className="absolute -right-6 -bottom-6 text-zinc-100 w-44 h-44 -rotate-12 pointer-events-none" />

        <div className="flex flex-col items-center text-center relative z-10">
          
          {/* Rating stars */}
          <div className="flex items-center gap-1 mb-6 text-yellow-500">
            {Array.from({ length: activeTest.rating }).map((_, i) => (
              <Star key={i} size={16} className="fill-yellow-500" />
            ))}
          </div>

          {/* Feedback content quote */}
          <blockquote className="text-sm sm:text-base text-zinc-800 leading-relaxed italic max-w-2xl mb-8 font-sans">
            "{activeTest.content}"
          </blockquote>

          {/* User profile details */}
          <div className="flex items-center gap-3">
            <img
              src={activeTest.avatarUrl}
              alt={activeTest.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full border border-zinc-200 object-cover"
            />
            <div className="text-left">
              <cite className="not-italic text-sm font-bold text-zinc-900 block">{activeTest.name}</cite>
              <span className="text-[10px] font-mono text-zinc-500">{activeTest.role} | <span className="text-purple-600 font-bold">{activeTest.company}</span></span>
            </div>
          </div>

        </div>

        {/* Carousel buttons */}
        {testimonials.length > 1 && (
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-4 right-4 z-20 pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-white/80 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 pointer-events-auto transition-all border border-zinc-200 cursor-pointer shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-white/80 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-800 pointer-events-auto transition-all border border-zinc-200 cursor-pointer shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>

      {/* STEPPERS DOT INDICATOR */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === i ? 'bg-purple-600 w-4' : 'bg-zinc-200 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
