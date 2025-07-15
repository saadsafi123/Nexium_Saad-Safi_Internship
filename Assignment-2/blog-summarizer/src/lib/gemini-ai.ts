// src/lib/gemini-ai.ts
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set.');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
];

export async function getGeminiSummaryAndKeywords(
  text: string,
  summaryLength: 'short' | 'medium' | 'long' | string,
  summaryStyle: 'default' | 'formal' | 'informal' | 'bullet points' | string
): Promise<{ summary: string; keywords: string[] }> {
  try {
    const prompt = `Summarize the following blog post.
    Focus on the main points and key takeaways.
    Length: ${summaryLength === 'auto' ? 'appropriate' : summaryLength}.
    Style: ${summaryStyle === 'default' ? 'neutral and concise' : summaryStyle}.
    
    After the summary, extract up to 10 key keywords or phrases from the text.
    Format the keywords as a comma-separated list.
    
    --- Blog Post ---
    ${text}
    
    ---
    Summary:
    Keywords:`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
    });

    const response = result.response;
    const fullTextResponse = response.text();

    const summaryMatch = fullTextResponse.match(/Summary:\s*([\s\S]*?)\s*Keywords:/i);
    const keywordsMatch = fullTextResponse.match(/Keywords:\s*([\s\S]*)/i);

    const summary = summaryMatch && summaryMatch[1] ? summaryMatch[1].trim() : fullTextResponse.split('\nKeywords:')[0].replace('Summary:', '').trim();
    const keywordsString = keywordsMatch && keywordsMatch[1] ? keywordsMatch[1].trim() : '';

    const keywords = keywordsString
      .split(',')
      .map(kw => kw.trim())
      .filter(kw => kw.length > 0);

    return { summary, keywords };

  } catch (error) {
    console.error('Error calling Gemini API for summarization:', error);
    throw new Error(`Failed to get summary from AI: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Translates text to a target language using the Google Gemini API.
 * @param text The text to translate.
 * @param targetLanguageCode The language code to translate to (e.g., 'ur', 'hi', 'es', 'fr', 'en').
 * @returns A promise that resolves to the translated text.
 */
export async function translateTextWithGemini(
  text: string,
  targetLanguageCode: string
): Promise<string> {
  if (!text || !targetLanguageCode) {
    return '';
  }

  const languageMap: { [key: string]: string } = {
    'en': 'English',
    'ur': 'Urdu',
    'hi': 'Hindi',
    'es': 'Spanish',
    'fr': 'French',
  };
  const targetLanguageName = languageMap[targetLanguageCode] || targetLanguageCode;

  try {
    // --- IMPROVED PROMPT FOR PURE URDU TRANSLATION ---
    const prompt = `Translate the following English text into ${targetLanguageName}.
    Ensure the translation is natural, grammatically correct, and uses pure ${targetLanguageName} vocabulary.
    Avoid incorporating English words or phrases directly into the ${targetLanguageName} translation unless they are universally recognized proper nouns, technical terms without a common ${targetLanguageName} equivalent, or specific product names. If a technical term has a common ${targetLanguageName} equivalent, use that.
    Output only the translated text, nothing else.
    
    --- Text to Translate ---
    ${text}`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      safetySettings,
    });

    const response = result.response;
    return response.text().trim();

  } catch (error) {
    console.error(`Error translating text to ${targetLanguageName} with Gemini API:`, error);
    throw new Error(`Failed to translate text via AI: ${error instanceof Error ? error.message : String(error)}`);
  }
}