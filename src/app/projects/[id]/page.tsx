import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '../../../../server/db/index';
import ProjectDetailClient from './ProjectDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const projects = db.getProjects();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return {
      title: 'Project Case Study Not Found | Mohd. Ashfaq Khan',
      description: 'The requested engineering project case study could not be found.',
    };
  }

  return {
    title: `${project.title} | Case Study by Mohd. Ashfaq Khan`,
    description: project.description,
    keywords: [project.category, ...(project.technologies || []), 'Engineering Case Study', 'Mohd Ashfaq Khan Portfolio'],
    authors: [{ name: 'Mohd. Ashfaq Khan' }],
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: [
        {
          url: project.imageUrl || '/src/assets/images/user_profile_photo_1784629749234.jpg',
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.imageUrl || '/src/assets/images/user_profile_photo_1784629749234.jpg'],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const projects = db.getProjects();
  const project = projects.find(p => p.id === id);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: project.category,
    author: {
      '@type': 'Person',
      name: 'Mohd. Ashfaq Khan',
    },
    image: project.imageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
