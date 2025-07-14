// src/lib/summarizer.ts

/**
 * Simulates AI summarization and keyword extraction.
 * @param text The full blog text to summarize.
 * @returns An object containing the simulated summary and extracted keywords.
 */
export function simulateAISummary(text: string): { summary: string; keywords: string[] } {
  if (!text) {
    return { summary: 'No content to summarize.', keywords: [] };
  }

  // --- Simulated Summary Logic ---
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const summary = sentences.slice(0, Math.min(5, sentences.length)).join(' ').trim();

  // --- Simulated Keyword Extraction Logic ---
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'to', 'of', 'in', 'on', 'at', 'for', 'with', 'as', 'it', 'he', 'she', 'they', 'we', 'you', 'this', 'that', 'these', 'those', 'can', 'will', 'would', 'should', 'could', 'has', 'have', 'had', 'do', 'does', 'did', 'not', 'no', 'yes', 'so', 'about', 'just', 'from', 'by', 'about', 'into', 'then', 'than', 'when', 'where', 'why', 'how', 'which', 'what', 'who', 'whom', 'there', 'here', 'if', 'else', 'some', 'any', 'many', 'much', 'more', 'most', 'such', 'only', 'very', 'even', 'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'too', 'very', 's' // common short words/letters
  ]);

  const wordCounts: { [key: string]: number } = {};
  words.forEach(word => {
    if (word.length > 2 && !stopWords.has(word)) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });

  // Sort by frequency and take top N keywords
  const sortedWords = Object.entries(wordCounts).sort(([, countA], [, countB]) => countB - countA);
  const keywords = sortedWords.slice(0, Math.min(10, sortedWords.length)).map(([word]) => word); // Top 10 keywords

  return { summary, keywords };
}