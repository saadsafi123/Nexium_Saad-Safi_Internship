// src/app/history/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FavoriteButton } from '@/components/favorite-button';
import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';


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
  'dictionary': 'JS Dictionary',
  'gemini_api': 'Gemini API',
  'dictionary_fallback_gemini_failed': 'Gemini Fallback (JS Dictionary)',
};


export default function HistoryPage() {
  const [summaries, setSummaries] = useState<SummaryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [summaryIdToDelete, setSummaryIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/history');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch summaries.');
        }
        setSummaries(data.summaries);
      } catch (err: any) {
        console.error('Error fetching summaries:', err);
        setError(err.message || 'Could not load history.');
        toast.error('Failed to load history.', { description: err.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  const openDeleteDialog = (id: string) => {
    setSummaryIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!summaryIdToDelete) return;

    try {
      const response = await fetch('/api/summary/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: summaryIdToDelete }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete summary.');
      }

      setSummaries(prevSummaries => prevSummaries.filter(summary => summary.id !== summaryIdToDelete));
      toast.success('Summary deleted successfully!', { duration: 1500 });
    } catch (err: any) {
      console.error('Error deleting summary:', err);
      toast.error('Failed to delete summary.', { description: err.message });
    } finally {
      setIsDeleteDialogOpen(false);
      setSummaryIdToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <main className="container flex-grow py-8 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Summary</span> History
        </h1>
        <p className="text-center text-muted-foreground">Loading history...</p>
        <div className="space-y-6 max-w-4xl mx-auto">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="shadow-lg animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/6"></div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container flex-grow py-8 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Summary</span> History
        </h1>
        <p className="text-center text-red-500">Error loading history: {error}</p>
      </main>
    );
  }

  if (summaries.length === 0) {
    return (
      <main className="container flex-grow py-8 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Summary</span> History
        </h1>
        <p className="text-center text-muted-foreground">No summaries found. Summarize a blog on the Home page to see your history!</p>
      </main>
    );
  }

  return (
    <main className="container flex-grow py-8 px-4 md:px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Summary</span> History
      </h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {summaries.map((summary: SummaryItem) => {
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
            <Card key={summary.id} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold flex items-center space-x-2">
                  <LinkIcon className="h-5 w-5 text-muted-foreground" />
                  <a href={summary.original_url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-500 break-words text-lg font-semibold">
                    {summary.original_url.length > 50 ? `${summary.original_url.substring(0, 50)}...` : summary.original_url}
                  </a>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <FavoriteButton summaryId={summary.id} initialIsFavorite={summary.is_favorite} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => openDeleteDialog(summary.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <p className="text-sm text-muted-foreground">Summarized on: {formattedDate}</p>

                {/* English Summary Snippet */}
                <div>
                  <h3 className="text-md font-semibold text-blue-800 mb-1">English Summary:</h3>
                  <ScrollArea className="h-20 rounded-md border p-3 bg-secondary shadow-inner text-sm">
                    <p className="text-foreground leading-relaxed">
                      {summary.english_summary.substring(0, 200)}...
                    </p>
                  </ScrollArea>
                </div>

                {/* Translated Summary Snippet */}
                <div>
                  <h3 className="text-md font-semibold text-green-800 mb-1">
                    <span>{translatedLanguageName} ({displayTranslationMethod}) Translation:</span>
                  </h3>
                  <ScrollArea className="h-20 rounded-md border p-3 bg-secondary shadow-inner text-sm" dir={translationDir}>
                    <p className={cn("text-foreground", translationDir === 'rtl' ? 'text-right' : 'text-left', translationFontClass, "leading-loose")}>
                      {summary.urdu_summary.substring(0, 200)}...
                    </p>
                  </ScrollArea>
                </div>

                {/* Keywords */}
                <div>
                  <h3 className="text-md font-semibold mb-1">Keywords:</h3>
                  <div className="flex flex-wrap gap-1">
                    {summary.keywords.slice(0, 5).map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="px-2 py-0.5 text-xs bg-purple-100 text-purple-800">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Button to view full details */}
                <div className="text-right">
                <Link href={`/summary/${summary.id}`} className="text-primary hover:underline px-4 py-2 text-sm font-medium rounded-md">
                View Full Details
                </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Delete Confirmation AlertDialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your summary
              from our database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              Continue Deleting
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}