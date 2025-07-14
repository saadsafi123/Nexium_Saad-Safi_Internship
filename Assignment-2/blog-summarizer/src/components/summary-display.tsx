// src/components/summary-display.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SummaryResponse } from './url-form';
import { cn } from '@/lib/utils';
import { CopyButton } from './copy-button';

interface SummaryDisplayProps {
  summary: SummaryResponse | null;
  isLoading: boolean;
}

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

  return (
    <Card className="w-full max-w-3xl shadow-lg"> 
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary-foreground bg-primary p-4 rounded-t-lg">
          Blog Summary
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
            <span>اردو خلاصہ (Urdu Summary):</span>
            <CopyButton textToCopy={summary.urdu_summary} />
          </h3>
          <ScrollArea className="h-40 rounded-md border p-4 bg-secondary shadow-inner" dir="rtl">
            <p className={cn("text-right text-foreground leading-relaxed text-base font-urdu")}>
              {summary.urdu_summary}
            </p>
          </ScrollArea>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
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