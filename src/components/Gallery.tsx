/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Image, ShieldAlert, X, Eye, Grid } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryProps {
  gallery: GalleryItem[];
  isAdmin: boolean;
  onDeleteGalleryItem?: (id: string) => void;
}

export default function Gallery({ gallery, isAdmin, onDeleteGalleryItem }: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'image' | 'certificate' | 'award'>('all');

  const filters = [
    { id: 'all', label: 'All Artifacts', icon: <Grid size={12} /> },
    { id: 'image', label: 'Dashboard Designs', icon: <Image size={12} /> },
    { id: 'certificate', label: 'Certificates', icon: <Award size={12} /> },
    { id: 'award', label: 'Hackathon Awards', icon: <Award size={12} className="text-yellow-400" /> }
  ];

  const filteredItems = activeFilter === 'all' 
    ? gallery 
    : gallery.filter(item => item.type === activeFilter);

  return (
    <section id="gallery-section" className="py-24 px-6 max-w-6xl mx-auto">
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <h2 id="gallery-title" className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 font-sans">
          Credentials & <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">Visual Gallery</span>
        </h2>
        <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full mt-4" />
        <p className="text-xs font-mono text-zinc-400 mt-3 uppercase tracking-widest">
          A showcase of verified awards and layout blueprints
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div id="gallery-filters" className="flex flex-wrap justify-center gap-2 mb-10">
        {filters.map(filt => (
          <button
            key={filt.id}
            onClick={() => setActiveFilter(filt.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
              activeFilter === filt.id
                ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm'
                : 'bg-transparent text-zinc-500 border-transparent hover:text-zinc-950 hover:bg-zinc-50'
            }`}
          >
            {filt.icon}
            {filt.label}
          </button>
        ))}
      </div>

      {/* GALLERY GRID */}
      <div id="gallery-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={`gallery-item-${item.id}`}
            onClick={() => setSelectedItem(item)}
            className="group rounded-2xl overflow-hidden border border-zinc-200 bg-white/80 backdrop-blur-md aspect-video shadow-sm hover:border-zinc-300 hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative cursor-pointer"
          >
            <img
              src={item.url}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hover overlay with detail expansion */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest mb-1">{item.type}</span>
              <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
              {item.description && <p className="text-[11px] text-zinc-300 line-clamp-1 mb-2">{item.description}</p>}
              
              <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400">
                <Eye size={12} />
                <span>Expand Blueprint</span>
              </div>
            </div>

            {/* Admin Delete Action */}
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteGalleryItem && onDeleteGalleryItem(item.id);
                }}
                className="absolute top-2 left-2 p-1.5 bg-red-600 hover:bg-red-500 rounded-lg text-white text-xs font-bold shadow-md z-20"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* DETAILS VIEW LIGHTBOX */}
      {selectedItem && (
        <div
          id="gallery-lightbox"
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-md p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full flex flex-col items-center bg-white border border-zinc-200 rounded-2xl overflow-hidden relative shadow-2xl text-zinc-800"
          >
            {/* Close */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1.5 text-zinc-500 hover:text-zinc-800 bg-white/80 hover:bg-zinc-100 rounded-xl transition-all cursor-pointer z-10 border border-zinc-200 shadow-sm"
            >
              <X size={18} />
            </button>

            {/* Expanded Image */}
            <div className="w-full h-[65vh] bg-zinc-50 flex items-center justify-center border-b border-zinc-200">
              <img
                src={selectedItem.url}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Description details card footer */}
            <div className="p-5 w-full text-left bg-zinc-50/90 border-t border-zinc-200">
              <span className="text-[10px] font-mono text-amber-700 uppercase tracking-widest block mb-1">{selectedItem.type}</span>
              <h3 className="text-base font-bold text-zinc-900 mb-1.5">{selectedItem.title}</h3>
              {selectedItem.description && (
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">{selectedItem.description}</p>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
