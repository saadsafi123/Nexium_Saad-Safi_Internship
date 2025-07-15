// src/app/summary/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FavoriteButton } from '@/components/favorite-button';
import { CopyButton } from '@/components/copy-button';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface SummaryItem {
  id: string;
  original_url: string;
  english_summary: string;
  urdu_summary: string;
  api_translated_summary: string | null;
  target_language_code: string | null;
  translation_method_used: string | null;
  keywords: string[];
  is_favorite: boolean;
  created_at: string;
}

const languageCodeToName: { [key: string]: string } = {
  'en': 'English', 'ur': 'Urdu', 'hi': 'Hindi', 'es': 'Spanish', 'fr': 'French',
};
const translationMethodDisplayName: { [key: string]: string } = {
  'dictionary': 'JS Dictionary', 'gemini_api': 'Gemini API', 'dictionary_fallback_gemini_failed': 'Gemini Fallback (JS Dictionary)',
};

export default function SummaryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [summary, setSummary] = useState<SummaryItem | null>(null);
  const [fullText, setFullText] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const [summaryResponse, fullTextResponse] = await Promise.all([
          fetch(`/api/summary/${id}`),
          fetch(`/api/full-text/${id}`), 
        ]);

        const summaryData = await summaryResponse.json();
        const fullTextData = await fullTextResponse.json(); 

        if (!summaryResponse.ok) {
          throw new Error(summaryData.error || 'Failed to fetch summary details.');
        }
        if (!fullTextResponse.ok) { 
          console.warn('Could not fetch full original text:', fullTextData.error);
          setFullText('Original full text not available for this summary.'); 
        } else {
          setFullText(fullTextData.fullText); 
        }

        setSummary(summaryData.summary);
      } catch (err: any) {
        console.error('Error fetching summary details:', err);
        setError(err.message || 'Could not load summary details.');
        toast.error('Failed to load summary details.', { description: err.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (isLoading) {
    return (
      <main className="container flex-grow py-8 px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Summary</span> Details
        </h1>
        <Card className="shadow-lg animate-pulse">
          <CardHeader className="h-20 bg-gray-200 rounded-t-lg"></CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container flex-grow py-8 px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Summary</span> Details
        </h1>
        <p className="text-center text-red-500">Error loading summary: {error}</p>
        <div className="text-center mt-8">
          <Button onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Button>
        </div>
      </main>
    );
  }

  if (!summary) {
    return (
      <main className="container flex-grow py-8 px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Summary</span> Details
        </h1>
        <p className="text-center text-muted-foreground">Summary not found.</p>
        <div className="text-center mt-8">
          <Button onClick={() => router.back()} className="text-primary-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
          </Button>
        </div>
      </main>
    );
  }

  const createdAt = new Date(summary.created_at);
  const formattedDate = format(createdAt, 'PPP at p');

  const translatedLanguageName = summary.target_language_code
    ? languageCodeToName[summary.target_language_code] || summary.target_language_code
    : 'Urdu';
  const translationDir = summary.target_language_code === 'ur' || summary.target_language_code === 'ar' ? 'rtl' : 'ltr';
  const translationFontClass = summary.target_language_code === 'ur' ? 'font-urdu' : '';
  const displayTranslationMethod = summary.translation_method_used
    ? translationMethodDisplayName[summary.translation_method_used] || summary.translation_method_used.replace(/_/g, ' ')
    : 'Translated';


  return (
    <main className="container flex-grow py-8 px-4 md:px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Summary</span> Details
      </h1>

      <div className="flex items-center justify-end mb-8">
        <Button onClick={() => router.back()} className="text-primary-foreground">
          <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary-foreground bg-primary p-4 rounded-t-lg flex items-center justify-between">
            <span>Blog Summary Details</span>
            {summary.id && (
              <FavoriteButton summaryId={summary.id} initialIsFavorite={summary.is_favorite} />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <p className="text-sm text-muted-foreground">Summarized on: {formattedDate}</p>

          <div>
            <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
              <span>Original URL:</span>
              <CopyButton textToCopy={summary.original_url} />
            </h3>
            <a href={summary.original_url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-500 break-words text-lg font-semibold">
              {summary.original_url}
            </a>
          </div>

          {/* Full English Summary */}
          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center justify-between">
              <span>English Summary:</span>
              <CopyButton textToCopy={summary.english_summary} />
            </h3>
            <ScrollArea className="h-60 max-h-[50vh] rounded-md border p-4 bg-secondary shadow-inner">
              <p className="text-foreground leading-relaxed text-base">
                {summary.english_summary}
              </p>
            </ScrollArea>
          </div>

          {/* Full Translated Summary */}
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center justify-between">
              <span>{translatedLanguageName} ({displayTranslationMethod}) Translation:</span>
              <CopyButton textToCopy={summary.urdu_summary} />
            </h3>
            <ScrollArea className="h-60 max-h-[50vh] rounded-md border p-4 bg-secondary shadow-inner" dir={translationDir}>
              <p className={cn("text-foreground text-base", translationDir === 'rtl' ? 'text-right' : 'text-left', translationFontClass, "leading-loose")}>
                {summary.urdu_summary}
              </p>
            </ScrollArea>
          </div>

          {/* --- Original Blog Post (Full Text) from MongoDB --- */}
          {fullText && (
            <div>
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-between text-purple-800">
                <span>Original Blog Post (Full Text):</span>
                <CopyButton textToCopy={fullText} />
              </h3>
              <ScrollArea className="h-60 max-h-[70vh] rounded-md border p-4 bg-secondary shadow-inner">
                <p className="text-foreground leading-relaxed text-base">
                  {fullText}
                </p>
              </ScrollArea>
            </div>
          )}

          {/* Keywords */}
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
    </main>
  );
}