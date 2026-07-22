'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Orbit, Code2, Zap } from 'lucide-react';

interface SectionDividerProps {
  icon?: 'sparkles' | 'orbit' | 'code' | 'zap';
  label?: string;
}

export default function SectionDivider({ icon = 'sparkles', label }: SectionDividerProps) {
  const IconComponent = 
    icon === 'orbit' ? Orbit :
    icon === 'code' ? Code2 :
    icon === 'zap' ? Zap : Sparkles;

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8 px-6 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Horizontal Gradient Glow Line Left */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-blue-500/50" />

      {/* Center Animated Glassmorphic Orb Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mx-4 px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-md border border-cyan-300/40 shadow-lg shadow-cyan-500/10 flex items-center gap-2 text-zinc-700 pointer-events-auto"
      >
        {/* Pulsing Backlight Halo */}
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-md pointer-events-none"
        />

        {/* Floating Icon */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            y: [0, -2, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative text-cyan-600"
        >
          <IconComponent size={16} />
        </motion.div>

        {label && (
          <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-600 uppercase">
            {label}
          </span>
        )}

        {/* Small sparkling star */}
        <motion.span 
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full bg-cyan-400"
        />
      </motion.div>

      {/* Horizontal Gradient Glow Line Right */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-blue-500/50 via-cyan-500/30 to-transparent" />

      {/* Moving Cosmic Particle Line Pulse */}
      <motion.div 
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 -translate-y-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] opacity-70"
      />
    </div>
  );
}
