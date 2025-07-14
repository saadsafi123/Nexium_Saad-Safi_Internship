// src/app/api/summarize/route.ts
import { NextResponse } from 'next/server';
import { scrapeBlogContent } from '@/lib/scraping';
import { simulateAISummary } from '@/lib/summarizer';
import { translateToUrdu } from '@/lib/translator';
import { saveSummaryToSupabase, saveFullTextToMongoDB } from '@/lib/db';

// Define the POST handler for the API route
export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // 1. Validate URL format (basic check)
    try {
      new URL(url);
    } catch (error) {
      console.error('URL validation error:', error); 
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    console.log(`Processing request for URL: ${url}`);

    // 2. Scrape blog content
    const fullText = await scrapeBlogContent(url);
    if (!fullText) {
      return NextResponse.json({ error: 'Could not scrape content from the provided URL. The page might be empty, protected, or structured differently.' }, { status: 400 });
    }
    console.log('Blog content scraped successfully.');

    // 3. Simulate AI Summary and Keyword Extraction
    const { summary: englishSummary, keywords } = simulateAISummary(fullText);
    if (!englishSummary || englishSummary === 'No content to summarize.') {
        return NextResponse.json({ error: 'Failed to generate summary from scraped content.' }, { status: 500 });
    }
    console.log('Summary and keywords generated.');

    // 4. Translate to Urdu
    const urduSummary = translateToUrdu(englishSummary);
    console.log('Summary translated to Urdu.');

    // 5. Save summary to Supabase
    try {
      await saveSummaryToSupabase({
        original_url: url,
        english_summary: englishSummary,
        urdu_summary: urduSummary,
        keywords: keywords,
      });
      console.log('Summary saved to Supabase.');
    } catch (dbError) {
      console.error('Failed to save to Supabase:', dbError);
    }

    // 6. Save full text to MongoDB
    try {
      await saveFullTextToMongoDB(url, fullText);
      console.log('Full text saved to MongoDB.');
    } catch (dbError) {
      console.error('Failed to save to MongoDB:', dbError);
    }

    // 7. Return the summarized data
    return NextResponse.json({
      original_url: url,
      english_summary: englishSummary,
      urdu_summary: urduSummary,
      keywords: keywords,
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('API Error:', error);
        return NextResponse.json({ error: `Internal Server Error: ${error instanceof Error ? error.message : String(error)}` }, { status: 500 });
  }
}