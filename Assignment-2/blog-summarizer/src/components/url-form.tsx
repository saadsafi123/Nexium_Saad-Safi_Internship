// src/components/url-form.tsx
'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UrlFormProps {
  onSummarize: (summaryData: SummaryResponse) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export interface SummaryResponse {
  id?: string;
  original_url: string;
  english_summary: string;
  urdu_summary: string;
  api_translated_summary?: string;
  keywords: string[];
  target_language_code?: string;
  translation_method_used?: string;
  is_favorite?: boolean;
}

export type SummarizationMethod = 'static' | 'ai';
export type TranslationMethod = 'dictionary' | 'api';
export type SummaryLength = 'short' | 'medium' | 'long' | 'auto';
export type SummaryStyle = 'default' | 'formal' | 'informal' | 'bullet points';
export type TargetLanguageCode = 'en' | 'ur' | 'hi' | 'es' | 'fr';

export function UrlForm({ onSummarize, onLoadingChange }: UrlFormProps) {
  const [url, setUrl] = useState<string>('');
  const [summarizationMethod, setSummarizationMethod] = useState<SummarizationMethod>('static');
  const [translationMethod, setTranslationMethod] = useState<TranslationMethod>('dictionary');
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('medium');
  const [summaryStyle, setSummaryStyle] = useState<SummaryStyle>('default');
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguageCode>('ur');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onLoadingChange(true);

    if (!url.trim()) {
      toast.error('Please enter a URL to summarize.');
      onLoadingChange(false);
      return;
    }

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          summarizationMethod,
          translationMethod,
          ...(summarizationMethod === 'ai' && { summaryLength, summaryStyle }),
          ...(translationMethod === 'api' && { targetLanguage }),
        }),
      });

      const data: SummaryResponse & { error?: string } = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'An unexpected error occurred.', {
          description: 'Summarization Failed',
        });
        return;
      }

      onSummarize(data);
      toast.success('Blog summarized successfully!', {
        description: 'Success!',
      });
    } catch (error) {
      console.error('Error during summarization request:', error);
      toast.error('Could not connect to the server. Please try again.', {
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

      {/* Summarization Method Selection */}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="summarization-method" className="text-base font-medium text-muted-foreground">Summarization Method</Label>
        <ToggleGroup
          type="single"
          value={summarizationMethod}
          onValueChange={(value: SummarizationMethod) => value && setSummarizationMethod(value)}
          className="w-full justify-between rounded-md border"
        >
          <ToggleGroupItem
            value="static"
            aria-label="Toggle static summarization"
            className="flex-1 rounded-l-md text-sm data-[state=on]:bg-primary/20 data-[state=on]:text-foreground dark:data-[state=on]:bg-secondary dark:data-[state=on]:text-foreground"
          >
            Static Logic
          </ToggleGroupItem>
          <ToggleGroupItem
            value="ai"
            aria-label="Toggle AI summarization"
            className="flex-1 rounded-r-md text-sm data-[state=on]:bg-primary/20 data-[state=on]:text-foreground dark:data-[state=on]:bg-secondary dark:data-[state=on]:text-foreground"
          >
            AI (Gemini API)
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {summarizationMethod === 'ai' && (
        <>
          {/* Summary Length Selection */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="summary-length" className="text-base font-medium text-muted-foreground">Summary Length</Label>
            <Select value={summaryLength} onValueChange={(value: SummaryLength) => setSummaryLength(value)}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select length" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground dark:bg-secondary dark:text-secondary-foreground">
                <SelectItem value="short" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">Short </SelectItem>
                <SelectItem value="medium" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">Medium </SelectItem>
                <SelectItem value="long" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">Long </SelectItem>
                <SelectItem value="auto" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Style Selection  */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="summary-style" className="text-base font-medium text-muted-foreground">Summary Style</Label>
            <Select value={summaryStyle} onValueChange={(value: SummaryStyle) => setSummaryStyle(value)}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground dark:bg-secondary dark:text-secondary-foreground">
                <SelectItem value="default" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">Default</SelectItem>
                <SelectItem value="formal" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">Formal</SelectItem>
                <SelectItem value="informal" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">Informal</SelectItem>
                <SelectItem value="bullet points" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">Bullet Points</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Translation Method Selection*/}
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="translation-method" className="text-base font-medium text-muted-foreground">Translation Method</Label>
        <ToggleGroup
          type="single"
          value={translationMethod}
          onValueChange={(value: TranslationMethod) => value && setTranslationMethod(value)}
          className="w-full justify-between rounded-md border"
        >
          <ToggleGroupItem
            value="dictionary"
            aria-label="Toggle JS Dictionary translation"
            className="flex-1 rounded-l-md text-sm data-[state=on]:bg-primary/20 data-[state=on]:text-foreground dark:data-[state=on]:bg-secondary dark:data-[state=on]:text-foreground"
          >
            JS Dictionary
          </ToggleGroupItem>
          <ToggleGroupItem
            value="api"
            aria-label="Toggle API translation"
            className="flex-1 rounded-r-md text-sm data-[state=on]:bg-primary/20 data-[state=on]:text-foreground dark:data-[state=on]:bg-secondary dark:data-[state=on]:text-foreground"
          >
            API / AI (Google Translate API)
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {translationMethod === 'api' && (
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="target-language" className="text-base font-medium text-muted-foreground">Translate To Language</Label>
          <Select value={targetLanguage} onValueChange={(value: TargetLanguageCode) => setTargetLanguage(value)}>
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Select target language" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground dark:bg-secondary dark:text-secondary-foreground custom-select-content">
              <SelectItem value="en" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">English</SelectItem>
              <SelectItem value="ur" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">Urdu</SelectItem>
              <SelectItem value="hi" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">Hindi</SelectItem>
              <SelectItem value="es" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">Spanish</SelectItem>
              <SelectItem value="fr" className="text-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full py-3 text-lg">Summarize Blog</Button>
    </form>
  );
}