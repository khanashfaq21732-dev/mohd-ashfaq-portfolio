'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ShieldAlert, Award, User, LogOut } from 'lucide-react';
import userProfileImg from '../assets/images/ashfaq_profile_photo_1784734869215.jpg';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  currentUser: any;
  onLogout: () => void;
  onOpenAdmin: () => void;
}

export default function Navbar({ activeSection, onNavigate, currentUser, onLogout, onOpenAdmin }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav 
      id="main-navbar" 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl rounded-2xl px-4 py-3 transition-all duration-300 glass-navbar"
    >
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <button 
          id="navbar-logo"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-400 to-pink-500 p-[1px] shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_20px_rgba(236,72,153,0.25)] transition-all duration-300 overflow-hidden">
            <img
              src={typeof userProfileImg === 'string' ? userProfileImg : (userProfileImg as any)?.src || '/assets/images/ashfaq_profile_photo_1784734869215.jpg'}
              alt="M. Ashfaq Khan"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/assets/images/ashfaq_profile_photo_1784734869215.jpg';
              }}
              className="w-full h-full rounded-lg object-cover object-top bg-white"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold tracking-tight text-zinc-900 font-sans group-hover:text-cyan-600 transition-colors">M. Ashfaq Khan</span>
            <span className="text-[10px] font-mono text-zinc-500 tracking-wider">CSE UNDERGRAD</span>
          </div>
        </button>

        {/* DESKTOP NAV ITEMS */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeSection === item.id
                  ? 'text-cyan-600 bg-zinc-100/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)] border border-zinc-200/50'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/50 border border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CONTROLS (ADMIN / AUTH) */}
        <div className="hidden md:flex items-center gap-2">
          {currentUser && currentUser.role === 'admin' && (
            <button
              id="nav-admin-dashboard"
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200/50 transition-all cursor-pointer"
            >
              <ShieldAlert size={14} />
              Dashboard
            </button>
          )}

          {currentUser ? (
            <div className="flex items-center gap-2 border-l border-zinc-200 pl-2">
              <span className="flex items-center gap-1 text-[11px] font-medium text-zinc-600">
                <User size={12} className="text-cyan-600" />
                {currentUser.name.split(' ')[0]}
              </span>
              <button
                id="nav-logout-btn"
                onClick={onLogout}
                title="Log Out"
                className="p-1.5 text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              id="nav-recruiter-login"
              onClick={onOpenAdmin}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_4px_12px_rgba(6,182,212,0.2)] hover:shadow-[0_4px_18px_rgba(6,182,212,0.3)] transition-all duration-300 cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <div className="flex md:hidden items-center gap-2">
          {currentUser && currentUser.role === 'admin' && (
            <button
              id="nav-mobile-admin"
              onClick={onOpenAdmin}
              className="p-1.5 rounded-lg text-pink-600 bg-pink-50 border border-pink-200/50"
            >
              <ShieldAlert size={16} />
            </button>
          )}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-600 hover:text-zinc-900 bg-zinc-100 border border-zinc-200/50 rounded-xl"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div 
          id="mobile-drawer" 
          className="md:hidden mt-4 pt-4 border-t border-zinc-200/60 flex flex-col gap-2 bg-white/95 rounded-xl p-3 shadow-md"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-mob-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeSection === item.id
                  ? 'text-cyan-600 bg-zinc-100 border-l-2 border-cyan-500'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="border-t border-zinc-100 mt-2 pt-2 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center justify-between w-full px-2">
                <span className="flex items-center gap-1.5 text-xs text-zinc-600">
                  <User size={14} className="text-cyan-600" />
                  {currentUser.name}
                </span>
                <button
                  id="mobile-logout"
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogOut size={13} />
                  Log Out
                </button>
              </div>
            ) : (
              <button
                id="mobile-signin"
                onClick={() => {
                  onOpenAdmin();
                  setIsOpen(false);
                }}
                className="w-full text-center px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              >
                Recruiter / Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
