// src/components/url-form.tsx
'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner'; // IMPORT toast from sonner directly

interface UrlFormProps {
  onSummarize: (summaryData: SummaryResponse) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export interface SummaryResponse {
  original_url: string;
  english_summary: string;
  urdu_summary: string;
  keywords: string[];
}

export function UrlForm({ onSummarize, onLoadingChange }: UrlFormProps) {
  const [url, setUrl] = useState<string>('');
  // REMOVE: const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onLoadingChange(true);

    if (!url.trim()) {
      toast.error('Please enter a URL to summarize.'); // Use toast.error for destructive variant
      onLoadingChange(false);
      return;
    }

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data: SummaryResponse & { error?: string } = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'An unexpected error occurred.', { // Use toast.error
          description: 'Summarization Failed',
        });
        return;
      }

      onSummarize(data);
      toast.success('Blog summarized successfully!', { // Use toast.success
        description: 'Success!',
      });
    } catch (error) {
      console.error('Error during summarization request:', error);
      toast.error('Could not connect to the server. Please try again.', { // Use toast.error
        description: 'Network Error',
      });
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="blog-url" className="text-lg font-semibold">Blog URL</Label>
        <Input
          type="url"
          id="blog-url"
          placeholder="e.g., https://www.example.com/blog-post"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-3 text-base"
        />
      </div>
      <Button type="submit" className="w-full py-3 text-lg">Summarize Blog</Button>
    </form>
  );
}