import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#06b6d4',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Mohd. Ashfaq Khan | Full-Stack Developer & CSE Undergrad',
  description: 'Portfolio of Mohd. Ashfaq Khan - Computer Science undergraduate (B.Tech, SRMU) specializing in performant web products, Agri-Tech innovations, algorithmic problem solving, and software engineering.',
  keywords: [
    'Mohd Ashfaq Khan',
    'Ashfaq Khan',
    'Full Stack Developer',
    'Computer Science Engineer',
    'SRMU Lucknow',
    'Agri-Tech',
    'Dasheri Shield',
    'React',
    'Next.js',
    'TypeScript',
    'Express.js',
    'Python',
    'C Programming'
  ],
  authors: [{ name: 'Mohd. Ashfaq Khan', url: 'https://github.com/khanashfaq21732-dev' }],
  creator: 'Mohd. Ashfaq Khan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://khanashfaq-portfolio.dev',
    title: 'Mohd. Ashfaq Khan | Full-Stack Developer & CSE Undergrad',
    description: 'Explore software projects, Agri-Tech innovations, engineering blogs, and core competencies of Mohd. Ashfaq Khan.',
    siteName: 'Mohd. Ashfaq Khan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohd. Ashfaq Khan | Full-Stack Developer',
    description: 'Explore software projects, Agri-Tech innovations, and engineering blogs by Mohd. Ashfaq Khan.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-zinc-50 text-zinc-800 antialiased selection:bg-cyan-100 selection:text-cyan-950">
        {children}
      </body>
    </html>
  );
}
