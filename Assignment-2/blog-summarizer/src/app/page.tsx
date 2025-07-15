// src/app/page.tsx
'use client';

import { useState } from 'react';
import { UrlForm, SummaryResponse } from '@/components/url-form';
import { SummaryDisplay } from '@/components/summary-display';
import { Separator } from '@/components/ui/separator';

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
    <main className="container flex-grow py-8 px-4 md:px-6 max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Blog</span> Summarizer
        </h1>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-10 w-full max-w-xl md:max-w-3xl">
        <UrlForm onSummarize={handleSummarize} onLoadingChange={handleLoadingChange} />

        <Separator className="my-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full w-3/4" />

        <SummaryDisplay summary={summarizedData} isLoading={isLoading} />
      </div>
    </main>
  );
}