import React from 'react';
import App from '../App';

// Server-rendered metadata for home page SEO
export const metadata = {
  title: 'Mohd. Ashfaq Khan | Full-Stack Developer & CSE Portfolio',
  description: 'Official portfolio of Mohd. Ashfaq Khan. CSE undergraduate at SRMU specializing in web engineering, Agri-Tech projects like The Dasheri Shield, and full-stack software development.',
  openGraph: {
    title: 'Mohd. Ashfaq Khan | Software Engineering & Full-Stack Portfolio',
    description: 'Explore full-stack applications, Agri-Tech monitoring systems, technical blogs, and engineering milestones.',
  }
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohd. Ashfaq Khan',
    jobTitle: 'Full-Stack Developer & CSE Undergraduate',
    url: 'https://github.com/khanashfaq21732-dev',
    sameAs: [
      'https://github.com/khanashfaq21732-dev',
      'https://www.linkedin.com/in/ashfaq-khan-0a9385372/'
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Shri Ramswaroop Memorial University'
    },
    knowsAbout: [
      'Full-Stack Web Development',
      'Data Structures & Algorithms',
      'C Programming',
      'Python',
      'React.js',
      'Next.js',
      'Express.js',
      'Tailwind CSS',
      'Agri-Tech'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <App />
    </>
  );
}
