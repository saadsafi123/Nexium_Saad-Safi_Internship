// src/components/summary-display.tsx
'use client'; // This component needs to be a client component because it uses cn from lib/utils

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SummaryResponse } from './url-form'; // Re-use the interface
import { cn } from '@/lib/utils'; // Import cn utility

// Import the Noto Nastaliq Urdu font variable from layout.tsx
// This needs to be imported or accessed somehow if not directly passed or global.
// The easiest way for now is to use the `font-urdu` Tailwind class directly.
// To make `font-urdu` work, you MUST extend Tailwind's theme:
// In tailwind.config.ts, under theme.extend.fontFamily:
//   fontFamily: {
//     sans: ["var(--font-sans)", ...fontFamily.sans],
//     urdu: ["var(--font-urdu)"], // ADD THIS LINE for your Urdu font
//   },
// You also need to import `fontFamily` from `tailwindcss/defaultTheme` at the top of tailwind.config.ts

interface SummaryDisplayProps {
  summary: SummaryResponse | null;
  isLoading: boolean;
}

export function SummaryDisplay({ summary, isLoading }: SummaryDisplayProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-xl animate-pulse">
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
      <Card className="w-full max-w-xl text-center py-8">
        <CardContent>
          <p className="text-lg text-gray-500">Enter a blog URL above to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary-foreground bg-primary p-4 rounded-t-lg">
          Blog Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Original URL:</h3>
          <a href={summary.original_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-words">
            {summary.original_url}
          </a>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-800">English Summary:</h3>
          <ScrollArea className="h-40 rounded-md border p-4 bg-gray-50">
            <p className="text-gray-700 leading-relaxed text-base">
              {summary.english_summary}
            </p>
          </ScrollArea>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-green-800">اردو خلاصہ (Urdu Summary):</h3>
          <ScrollArea className="h-40 rounded-md border p-4 bg-gray-50" dir="rtl">
            {/* Using the `font-urdu` class which will be defined in tailwind.config.ts */}
            <p className={cn("text-right text-gray-700 leading-relaxed text-base font-urdu")}>
              {summary.urdu_summary}
            </p>
          </ScrollArea>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Keywords:</h3>
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