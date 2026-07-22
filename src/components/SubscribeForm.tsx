'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, Loader, CheckCircle, AlertCircle } from 'lucide-react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setStatus('error');
      setMessage('Failed to connect to the server. Please check your connection.');
    }
  };

  return (
    <div id="footer-subscriber-form-block" className="w-full max-w-sm p-4 rounded-xl glass-panel relative overflow-hidden text-left">
      {/* Decorative gradient overlay */}
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-cyan-400/10 blur-xl pointer-events-none" />
      
      <div className="flex flex-col gap-2.5 relative z-10">
        <div>
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 flex items-center gap-1">
            <Mail size={12} className="animate-pulse" />
            Get Notified
          </h4>
          <p className="text-[10px] text-zinc-500 font-sans mt-0.5 leading-normal">
            Subscribe to get instant alerts on new Agri-Tech releases and portfolio updates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-1.5">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address..."
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-2.5 py-1.5 text-[11px] rounded-lg text-zinc-800 glass-input placeholder-zinc-400 font-sans pr-8 disabled:opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success' || !email}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 transition-all border shadow-xs cursor-pointer ${
              status === 'success'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border-cyan-100'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {status === 'loading' ? (
              <Loader size={11} className="animate-spin" />
            ) : status === 'success' ? (
              <CheckCircle size={11} />
            ) : (
              <>
                <span>Join</span>
                <ArrowRight size={10} className="transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-1.5 p-1.5 rounded-md text-[9px] font-sans ${
                status === 'success'
                  ? 'bg-emerald-50/70 text-emerald-800 border border-emerald-100'
                  : 'bg-red-50/70 text-red-800 border border-red-100'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle size={11} className="text-emerald-500 flex-shrink-0" />
              ) : (
                <AlertCircle size={11} className="text-red-500 flex-shrink-0" />
              )}
              <span>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
