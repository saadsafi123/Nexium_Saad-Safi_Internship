// src/app/favorites/page.tsx
'use client'; 

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FavoriteButton } from '@/components/favorite-button';
// import { CopyButton } from '@/components/copy-button'; 
// import { Button } from '@/components/ui/button';
import { Link as LinkIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// --- METADATA NOTE ---
// For metadata in client components, you typically set it in the parent layout,
// or use a separate Server Component to render metadata.
// For now, we'll keep it commented out to avoid build issues.
// export const metadata: Metadata = {
//   title: 'Favorite Summaries | Nexium Blog Summarizer',
//   description: 'View your favorite blog summarization history.',
// };


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


export default function FavoritesPage() {
  const [favoriteSummaries, setFavoriteSummaries] = useState<SummaryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch favorites
  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/favorites'); 
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch favorite summaries.');
      }
      setFavoriteSummaries(data.summaries);
    } catch (err: unknown) { 
      console.error('Error fetching favorite summaries:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      toast.error('Failed to load favorites.', { description: err instanceof Error ? err.message : 'An unknown error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleFavoriteStatusChange = (updatedId: string, newStatus: boolean) => {
    // If an item is unstarred, remove it from the favorites list immediately
    if (!newStatus) {
      setFavoriteSummaries(prev => prev.filter(summary => summary.id !== updatedId));
    }
  };


  if (isLoading) {
    return (
      <main className="container flex-grow py-8 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Favorite</span> Summaries
        </h1>
        <p className="text-center text-muted-foreground">Loading favorites...</p>
        <div className="space-y-6 max-w-4xl mx-auto">
          {[...Array(2)].map((_, i) => ( // Placeholder for loading state
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Favorite</span> Summaries
        </h1>
        <p className="text-center text-red-500">Error loading favorites: {error}</p>
      </main>
    );
  }

  if (favoriteSummaries.length === 0) {
    return (
      <main className="container flex-grow py-8 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Favorite</span> Summaries
        </h1>
        <p className="text-center text-muted-foreground">No favorite summaries found. Mark some blogs as favorite on the Home or History page!</p>
      </main>
    );
  }

  return (
    <main className="container flex-grow py-8 px-4 md:px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white leading-tight mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Favorite</span> Summaries
      </h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {favoriteSummaries.map((summary: SummaryItem) => {
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
                  <FavoriteButton
                    summaryId={summary.id}
                    initialIsFavorite={summary.is_favorite}
                    onToggle={handleFavoriteStatusChange} 
                  />
                  {/* No Delete button on Favorites tab */}
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
    </main>
  );
}