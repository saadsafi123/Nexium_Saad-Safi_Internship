// src/components/summary-display.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SummaryResponse } from './url-form';
import { cn } from '@/lib/utils';
import { CopyButton } from './copy-button';
import { FavoriteButton } from './favorite-button';

interface SummaryDisplayProps {
  summary: SummaryResponse | null;
  isLoading: boolean;
}

const languageCodeToName: { [key: string]: string } = {
  'en': 'English', 'ur': 'Urdu', 'hi': 'Hindi', 'es': 'Spanish', 'fr': 'French',
};

const translationMethodDisplayName: { [key: string]: string } = {
  'dictionary': 'لغات',
  'gemini_api': 'جیمینی اے پی آئی',
  'dictionary_fallback_gemini_failed': 'جیمینی فال بیک (لغات)',
};

export function SummaryDisplay({ summary, isLoading }: SummaryDisplayProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl animate-pulse">
        <CardHeader>
          <CardTitle className="text-xl">Generating Summary...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-4"></div>
        </CardContent>
      </Card>
    );
  }

  if (!summary) {
    return (
      <Card className="w-full max-w-2xl text-center py-8">
        <CardContent>
          <p className="text-lg text-gray-500">Enter a blog URL above to get started.</p>
        </CardContent>
      </Card>
    );
  }

  const translatedLanguageName = summary.target_language_code
    ? languageCodeToName[summary.target_language_code] || summary.target_language_code
    : 'Urdu';
  const translationDir = summary.target_language_code === 'ur' || summary.target_language_code === 'ar' ? 'rtl' : 'ltr';
  const translationFontClass = summary.target_language_code === 'ur' ? 'font-urdu' : '';

  const displayTranslationMethod = summary.translation_method_used
    ? translationMethodDisplayName[summary.translation_method_used] || summary.translation_method_used.replace(/_/g, ' ')
    : 'Translated';


  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary-foreground bg-primary p-4 rounded-t-lg flex items-center justify-between">
          <span>Blog Summary</span>
          {summary.id && (
            <FavoriteButton summaryId={summary.id} initialIsFavorite={summary.is_favorite || false} />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
            <span>Original URL:</span>
            <CopyButton textToCopy={summary.original_url} />
          </h3>
          <a href={summary.original_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-words">
            {summary.original_url}
          </a>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800 flex items-center justify-between">
            <span>English Summary:</span>
            <CopyButton textToCopy={summary.english_summary} />
          </h3>
          <ScrollArea className="h-40 rounded-md border p-4 bg-secondary shadow-inner">
            <p className="text-foreground leading-relaxed text-base">
              {summary.english_summary}
            </p>
          </ScrollArea>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-green-800 flex items-center justify-between">
            <span>{translatedLanguageName} ({displayTranslationMethod}) Translation:</span>
            <CopyButton textToCopy={summary.urdu_summary} />
          </h3>
          <ScrollArea className="h-40 rounded-md border p-4 bg-secondary shadow-inner" dir={translationDir}>
            <p className={cn("text-foreground text-base", translationDir === 'rtl' ? 'text-right' : 'text-left', translationFontClass, "leading-loose")}>
              {summary.urdu_summary}
            </p>
          </ScrollArea>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
            <span>Keywords:</span>
            <CopyButton textToCopy={summary.keywords.join(', ')} />
          </h3>
          <div className="flex flex-wrap gap-2">
            {summary.keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1 text-sm bg-purple-100 text-purple-800">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}