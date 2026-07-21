/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Bell, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  settings: any;
}

export default function Contact({ settings }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<any | null>(null);
  const [errorText, setErrorText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorText('');
    setSuccessInfo(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessInfo(data);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        setErrorText(data.error || "An unexpected error occurred. Please check values.");
      }
    } catch (err) {
      setErrorText("Database server could not be reached. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-24 px-6 max-w-6xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <h2 id="contact-title" className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          Initiate <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-pink-600">Connection</span>
        </h2>
        <div className="w-16 h-1.5 bg-cyan-500 mx-auto rounded-full mt-4" />
        <p className="text-xs font-mono text-zinc-400 mt-3 uppercase tracking-widest">
          Settle queries, recruit, or discuss full-stack projects
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        {/* LEFT COLUMN (CONTACT DATA & SOCIAL HANDLES) */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full justify-between">
          <div className="p-6 rounded-2xl flex flex-col gap-6 glass-panel">
            <h3 className="text-lg font-bold text-zinc-900">Direct Channels</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              Reach out directly or save my digital contact card. I am actively looking for software developer internships and university collaborations.
            </p>

            <div className="flex flex-col gap-4 font-mono text-xs text-zinc-700">
              <a 
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 transition-all group"
              >
                <Mail size={16} className="text-cyan-600 group-hover:scale-110 transition-transform" />
                <span className="truncate">{settings.email}</span>
              </a>

              <a 
                href={`tel:${settings.phone}`}
                className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-zinc-300 transition-all group"
              >
                <Phone size={16} className="text-pink-600 group-hover:scale-110 transition-transform" />
                <span>{settings.phone}</span>
              </a>

              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-left">
                <MapPin size={16} className="text-yellow-600 flex-shrink-0" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-4 mt-2">
              <h4 className="text-[10px] font-mono font-bold uppercase text-zinc-400 tracking-wider mb-3">Sync Socials</h4>
              <div className="flex items-center gap-2">
                <a
                  href={settings.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-xl text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer"
                >
                  <Github size={16} />
                </a>
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-xl text-cyan-600 hover:text-cyan-700 transition-all cursor-pointer"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* SIMULATED GOOGLE MAP */}
          <div className="rounded-2xl overflow-hidden aspect-video relative mt-4 glass-panel">
            <div className="absolute inset-0 bg-zinc-50/90 flex flex-col items-center justify-center text-center p-4">
              <MapPin size={24} className="text-cyan-600 animate-bounce mb-2" />
              <span className="font-sans text-xs font-bold text-zinc-800 uppercase tracking-widest">SRMU Campus Lucknow</span>
              <span className="text-[10px] text-zinc-500 mt-1">Lucknow, UP, India</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (DYNAMIC CONTACT FORM & EMAILS FEEDBACK) */}
        <div className="lg:col-span-3">
          
          {/* CRITICAL SUCCESS ALERT BIND */}
          {successInfo && (
            <div 
              id="contact-success-alert"
              className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50 mb-6 flex items-start gap-3.5 shadow-sm animate-fade-in"
            >
              <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-950 mb-1">Message Transmitted!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed font-sans mb-3">
                  Your message has been saved in our local secure database. The simulated email triggers dispatched successfully!
                </p>
                <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-white text-[10px] font-mono text-emerald-700 border border-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <Bell size={10} />
                    <span>[SMTP SIMULATOR] Internal notification email sent to khanashfaq21732@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert size={10} />
                    <span>[SMTP SIMULATOR] Automated auto-reply email dispatched to {successInfo.data?.email}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {errorText && (
            <div className="p-4 rounded-xl border border-red-200 bg-red-50 mb-6 text-xs font-mono text-red-700 flex items-center gap-2">
              <ShieldAlert size={14} />
              <span>{errorText}</span>
            </div>
          )}

          <form 
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl glass-panel"
          >
            <h3 className="text-base font-bold text-zinc-950 font-sans mb-6">Dissect Message Specifics</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  name="name"
                  placeholder="e.g. Mohd. Ashfaq Khan"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs text-zinc-900 glass-input"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="e.g. khanashfaq21732@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs text-zinc-900 glass-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Phone Number (Optional)</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="e.g. +91 6387046100"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs text-zinc-900 glass-input"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Company (Optional)</label>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g. University Tech / Google"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs text-zinc-900 glass-input"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Subject *</label>
              <input
                type="text"
                required
                name="subject"
                placeholder="e.g. B.Tech Internship Offer / Consultation Query"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs text-zinc-900 glass-input"
                />
            </div>

            <div className="mb-6">
              <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Detailed Message *</label>
              <textarea
                required
                rows={5}
                name="message"
                placeholder="Write your comprehensive queries, specs or collaboration descriptions..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs text-zinc-900 glass-input resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 text-white shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={14} />
              {isSubmitting ? 'Transmitting Specs...' : 'Transmit Connection Message'}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
