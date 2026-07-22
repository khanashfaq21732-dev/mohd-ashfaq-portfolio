import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '../../../../server/db/index';
import BlogDetailClient from './BlogDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const blogs = db.getBlogs();
  const blog = blogs.find(b => b.id === id || b.slug === id);

  if (!blog) {
    return {
      title: 'Blog Post Not Found | Mohd. Ashfaq Khan',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${blog.title} | Technical Blog by Mohd. Ashfaq Khan`,
    description: blog.excerpt,
    keywords: [blog.category, ...(blog.tags || []), 'Mohd Ashfaq Khan Blog', 'Software Engineering'],
    authors: [{ name: 'Mohd. Ashfaq Khan' }],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.publishedDate,
      authors: ['Mohd. Ashfaq Khan'],
      images: [
        {
          url: blog.imageUrl || '/src/assets/images/user_profile_photo_1784629749234.jpg',
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.imageUrl || '/src/assets/images/user_profile_photo_1784629749234.jpg'],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { id } = await params;
  const blogs = db.getBlogs();
  const blog = blogs.find(b => b.id === id || b.slug === id);

  if (!blog) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.publishedDate,
    author: {
      '@type': 'Person',
      name: 'Mohd. Ashfaq Khan',
    },
    publisher: {
      '@type': 'Person',
      name: 'Mohd. Ashfaq Khan',
    },
    image: blog.imageUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient blog={blog} />
    </>
  );
}
