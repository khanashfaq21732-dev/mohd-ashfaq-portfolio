'use client';

import React, { useState } from 'react';
import { Camera, Trophy, Cpu, Users, Sparkles, ZoomIn, X } from 'lucide-react';
import hackathonImg from '../assets/images/hackathon_presentation_1784736684419.jpg';
import iotPrototypingImg from '../assets/images/iot_sensor_prototyping_1784736702347.jpg';
import workshopImg from '../assets/images/software_engineering_workshop_1784736717917.jpg';

export default function Gallery() {
  const [activeModalImage, setActiveModalImage] = useState<{
    src: string;
    title: string;
    category: string;
    desc: string;
  } | null>(null);

  const photos = [
    {
      title: "Agri-Tech Hackathon Finalist Presentation",
      category: "Hackathons",
      desc: "Presenting Dasheri Shield IoT system to jury panel at university innovation challenge",
      icon: Trophy,
      image: hackathonImg,
      fallbackUrl: '/assets/images/hackathon_presentation_1784736684419.jpg'
    },
    {
      title: "IoT Sensor Node Prototyping",
      category: "Hardware",
      desc: "Calibrating temperature, humidity, and leaf wetness sensors for micro-climate telemetry",
      icon: Cpu,
      image: iotPrototypingImg,
      fallbackUrl: '/assets/images/iot_sensor_prototyping_1784736702347.jpg'
    },
    {
      title: "Software Engineering Workshop",
      category: "Community",
      desc: "Collaborating with fellow computer science developers on full-stack web applications",
      icon: Users,
      image: workshopImg,
      fallbackUrl: '/assets/images/software_engineering_workshop_1784736717917.jpg'
    }
  ];

  const getImgSrc = (photo: typeof photos[0]) => {
    if (typeof photo.image === 'string') return photo.image;
    return (photo.image as any)?.src || photo.fallbackUrl;
  };

  return (
    <section id="gallery-section" className="py-20 px-6 max-w-6xl mx-auto relative">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 text-xs font-mono font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
          <span>Visual Highlights</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          Activity <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Gallery</span>
        </h2>
        <div className="w-16 h-1.5 bg-cyan-500 mx-auto rounded-full mt-4" />
        <p className="text-sm text-zinc-500 mt-3 font-mono">Moments from hackathons, hardware labs, and tech events</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((item, idx) => {
          const CategoryIcon = item.icon;
          const imgSrc = getImgSrc(item);

          return (
            <div 
              key={idx} 
              className="group relative p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-zinc-200/80 hover:border-cyan-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              onClick={() => setActiveModalImage({
                src: imgSrc,
                title: item.title,
                category: item.category,
                desc: item.desc
              })}
            >
              {/* IMAGE CONTAINER WITH HOVER ZOOM EFFECT */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-zinc-100 border border-zinc-200/60">
                <img
                  src={imgSrc}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = item.fallbackUrl;
                  }}
                />

                {/* OVERLAY BADGE & ZOOM ICON */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-white/90 text-zinc-900 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-1.5 text-xs font-mono font-bold">
                    <ZoomIn size={16} className="text-cyan-600" />
                    <span>Expand Image</span>
                  </div>
                </div>

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-zinc-900/80 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider border border-zinc-700/50 flex items-center gap-1.5">
                  <CategoryIcon size={12} className="text-cyan-400" />
                  {item.category}
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-600 tracking-wider">
                  {item.category} Event
                </span>
                <h3 className="font-bold text-zinc-900 text-base group-hover:text-cyan-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 font-mono leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {activeModalImage && (
        <div 
          className="fixed inset-0 z-50 bg-zinc-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalImage(null)}
        >
          <div 
            className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[360px] sm:h-[420px] bg-zinc-950">
              <img 
                src={activeModalImage.src} 
                alt={activeModalImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActiveModalImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-white transition-colors cursor-pointer border border-zinc-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 bg-white space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-[10px] font-mono font-bold uppercase tracking-wider border border-cyan-200">
                {activeModalImage.category}
              </span>
              <h3 className="text-xl font-black text-zinc-900">{activeModalImage.title}</h3>
              <p className="text-xs font-mono text-zinc-600 leading-relaxed">{activeModalImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
