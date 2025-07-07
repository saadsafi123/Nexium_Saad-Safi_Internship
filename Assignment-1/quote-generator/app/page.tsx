import { QuoteGenerator } from "@/components/QuoteGenerator";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quote Generator | Nexium Assignment 1',
  description: 'An inspirational quote generator built with Next.js, ShadCN UI, and DaisyUI for the Nexium internship.',
  keywords: ['quotes', 'motivation', 'inspiration', 'nextjs', 'shadcn', 'daisyui', 'nexium', 'internship'],
  authors: [{ name: 'Saad Safi' }],
  openGraph: {
    title: 'Quote Generator | Nexium Assignment 1',
    description: 'An inspirational quote generator built with Next.js, ShadCN UI, and DaisyUI.',
    url: 'https://your-deployed-url.vercel.app', 
    siteName: 'Nexium Assignment 1',
    images: [
      {
        url: 'https://your-deployed-url.vercel.app/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Quote Generator App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quote Generator | Nexium Assignment 1',
    description: 'An inspirational quote generator built with Next.js, ShadCN UI, and DaisyUI.',
    creator: '@your_twitter_handle', 
    images: ['https://your-deployed-url.vercel.app/twitter-image.jpg'], 
  },
};

export default function Home() {
  return (
    <main>
      <QuoteGenerator />
    </main>
  );
}