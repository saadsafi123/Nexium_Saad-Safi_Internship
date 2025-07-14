// src/app/page.tsx
'use client'; // Mark as a client component to use useState and interactive features

import { useState } from 'react';
import { UrlForm, SummaryResponse } from '@/components/url-form';
import { SummaryDisplay } from '@/components/summary-display';
import { Separator } from '@/components/ui/separator'; // Add separator for visual division

// To add separator, run: pnpm dlx shadcn-ui@latest add separator

export default function Home() {
  const [summarizedData, setSummarizedData] = useState<SummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSummarize = (data: SummaryResponse) => {
    setSummarizedData(data);
  };

  const handleLoadingChange = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 lg:p-24 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="z-10 w-full max-w-2xl items-center justify-between font-mono text-sm lg:flex mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Nexium</span> Blog Summarizer
        </h1>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-10 w-full max-w-3xl">
        <UrlForm onSummarize={handleSummarize} onLoadingChange={handleLoadingChange} />

        <Separator className="my-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full w-3/4" />

        <SummaryDisplay summary={summarizedData} isLoading={isLoading} />
      </div>
    </main>
  );
}