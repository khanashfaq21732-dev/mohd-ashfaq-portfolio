'use client';

import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. A. Sharma",
      role: "Agri-Tech Hackathon Judge",
      comment: "Dasheri Shield showcased an incredible combination of real-time hardware telemetry and predictive analytics. Ashfaq's engineering depth was outstanding."
    },
    {
      name: "Prof. R. Mehta",
      role: "Computer Science Faculty",
      comment: "Ashfaq demonstrates disciplined problem solving in C/C++ and modern web frameworks, consistently delivering clean and well-structured code."
    }
  ];

  return (
    <section id="testimonials-section" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          Endorsements & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Reviews</span>
        </h2>
        <div className="w-16 h-1.5 bg-cyan-500 mx-auto rounded-full mt-4" />
        <p className="text-sm text-zinc-500 mt-3 font-mono">Feedback from faculty, mentors, and hackathon judges</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((rev, idx) => (
          <div key={idx} className="p-6 rounded-2xl glass-panel relative">
            <Quote className="text-cyan-200 absolute top-6 right-6" size={32} />
            <div className="flex gap-1 text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-zinc-700 italic leading-relaxed mb-6">
              "{rev.comment}"
            </p>
            <div>
              <h4 className="font-bold text-zinc-900 text-sm">{rev.name}</h4>
              <p className="text-xs font-mono text-cyan-600">{rev.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
