// src/lib/scraping.ts
import * as cheerio from 'cheerio';
// import { JSDOM } from 'jsdom'; 

/**
 * Scrapes a given URL and extracts the main textual content.
 * @param url The URL of the blog post to scrape.
 * @returns A promise that resolves to the extracted text, or an empty string on failure.
 */
export async function scrapeBlogContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch URL: ${url}, Status: ${response.status}`);
      return '';
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // --- Intelligent Content Extraction Logic ---
    const selectors = [
      'article',
      '.entry-content',
      '.post-content',
      '.blog-content',
      'main',
      '#content',
      '.container',
      'body',
    ];

    let content = '';
    for (const selector of selectors) {
      const element = $(selector).first();
      if (element.length) {
        element.find('script, style, nav, footer, header, .ads, .sidebar').remove();
        content = element.text();
        break;
      }
    }

    // Basic text cleanup: remove multiple newlines, trim whitespace
    return content.replace(/\n\s*\n/g, '\n').trim();

  } catch (error) {
    console.error(`Error during scraping ${url}:`, error);
    return '';
  }
}