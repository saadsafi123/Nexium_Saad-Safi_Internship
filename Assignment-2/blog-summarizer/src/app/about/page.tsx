// src/app/about/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator'; 

export const metadata: Metadata = {
  title: 'About | Nexium Blog Summarizer',
  description: 'Learn more about the Nexium Blog Summarizer project.',
};

export default function AboutPage() {
  return (
    <main className="container flex-grow py-8 px-4 md:px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">About</span> This Project
      </h1>

      <Card className="shadow-lg p-6 space-y-6">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Nexium Blog Summarizer
          </CardTitle>
          <p className="text-muted-foreground mt-2 text-lg">
            AI-First Web Development Internship - Assignment 2
          </p>
        </CardHeader>

        <Separator className="my-6 bg-gradient-to-r from-blue-400 to-purple-400" />

        <CardContent className="space-y-6 text-lg leading-relaxed text-foreground">
          <p>
            The Nexium Blog Summarizer is a comprehensive web application developed as part of the{' '}
            <span className="font-semibold text-primary">Nexium AI-First Web Development Internship</span>.
            Its primary purpose is to showcase various modern web development concepts,
            effective AI integration, and robust database management in a single project.
          </p>
          <p>
            Users can input a blog post URL, and the application will intelligently fetch the content.
            It then generates a concise summary, extracts relevant keywords, and provides a translation into a selected language.
            All processed data is securely stored for historical viewing and future reference.
          </p>

          {/* Key Technologies Used Section */}
          <h2 className="text-2xl md:text-3xl font-extrabold mt-8 mb-4 text-blue-500 dark:text-blue-400">
            Key Technologies Used
          </h2>
          <ul className="list-disc list-inside space-y-3 ml-4 text-base leading-relaxed">
            <li>
              <span className="font-semibold text-foreground">Frontend:</span> Next.js (App Router, Server/Client Components), React, TypeScript, ShadCN UI, Tailwind CSS
            </li>
            <li>
              <span className="font-semibold text-foreground">Backend:</span> Next.js API Routes, Node.js
            </li>
            <li>
              <span className="font-semibold text-foreground">AI/LLM:</span> Google Gemini API (for true summarization & translation)
            </li>
            <li>
              <span className="font-semibold text-foreground">Databases:</span> Supabase (PostgreSQL for structured data/summaries), MongoDB (for raw blog text storage)
            </li>
            <li>
              <span className="font-semibold text-foreground">Styling & UI:</span> ShadCN UI (for modern components), Tailwind CSS (for utility-first styling), `next-themes` (for Dark/Light mode)
            </li>
            <li>
              <span className="font-semibold text-foreground">Development Tools:</span> pnpm, ESLint, Prettier, GitHub
            </li>
            <li>
              <span className="font-semibold text-foreground">Deployment:</span> Vercel (planned)
            </li>
          </ul>

          <Separator className="my-6 bg-gradient-to-r from-blue-400 to-purple-400" />

          <h2 className="text-2xl md:text-3xl font-extrabold mt-8 mb-4 text-purple-500 dark:text-purple-400">
            AI Aspects
          </h2>
          <p>
            This project is designed to showcase both <span className="font-semibold text-primary">simulated AI logic</span> (for initial assignment requirements) and{' '}
            <span className="font-semibold text-primary">true AI integration</span> through advanced APIs:
          </p>
          <ul className="list-disc list-inside space-y-3 ml-4 text-base leading-relaxed">
            <li>
              <span className="font-semibold text-foreground">Simulated AI:</span> The &quot;Static Logic&quot; for summarization and &quot;JS Dictionary&quot; for translation demonstrate basic algorithmic approaches and hardcoded data manipulation, representing how simple AI concepts can be simulated.
            </li>
            <li>
              <span className="font-semibold text-foreground">True AI (Google Gemini API):</span> When selected, the &quot;AI&quot; summarization method and &quot;API/AI&quot; translation method leverage the powerful Google Gemini API to provide genuinely intelligent and high-quality summaries, accurate keyword extraction, and versatile multi-language translation.
            </li>
          </ul>

          <Separator className="my-6 bg-gradient-to-r from-blue-400 to-purple-400" /> 

          {/* Credits Section */}
          <h2 className="text-2xl md:text-3xl font-extrabold mt-8 mb-4 text-green-500 dark:text-green-400"> 
            Credits
          </h2>
          <p className="leading-relaxed">
            Developed by: <span className="font-semibold text-foreground">Saad Safi</span>
          </p>
          <p className="leading-relaxed">
            Internship Program: <span className="font-semibold text-foreground">Nexium AI-First Web Development Internship</span>
          </p>
          <p className="mt-4 leading-relaxed">
            Find the source code on GitHub: <br />
            <Link href="https://github.com/saadsafi123/Nexium_Saad-Safi_Internship/tree/main/Assignment-2/blog-summarizer" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              https://github.com/saadsafi123/Nexium_Saad-Safi_Internship/tree/main/Assignment-2/blog-summarizer
            </Link>
          </p>
          <p className="text-sm mt-4 text-muted-foreground leading-relaxed">
          </p>
        </CardContent>
      </Card>
    </main>
  );
}