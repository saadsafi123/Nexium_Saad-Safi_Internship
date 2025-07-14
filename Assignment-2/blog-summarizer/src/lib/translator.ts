// src/lib/translator.ts

// This is a very small, hardcoded dictionary for demonstration.
// In a real scenario, this would be massive, dynamically loaded, or use a translation API.
const englishToUrduDictionary: { [key: string]: string } = {
  "hello": "ہیلو",
  "world": "دنیا",
  "blog": "بلاگ",
  "summary": "خلاصہ",
  "article": "مضمون",
  "content": "مواد",
  "great": "بہت اچھا",
  "good": "اچھا",
  "morning": "صبح",
  "day": "دن",
  "information": "معلومات",
  "technology": "ٹیکنالوجی",
  "science": "سائنس",
  "news": "خبریں",
  "read": "پڑھنا",
  "important": "اہم",
  "welcome": "خوش آمدید",
  "this": "یہ",
  "is": "ہے",
  "a": "ایک",
  "and": "اور",
  "the": "کے",
  "no content to summarize": "خلاصہ کرنے کے لیے کوئی مواد نہیں",
  // Add more words/phrases as needed for better "simulation"
};

/**
 * Simulates translation from English to Urdu using a predefined dictionary.
 * This is a highly simplified approach for assignment purposes.
 * @param text The English text to translate.
 * @returns The simulated Urdu translation.
 */
export function translateToUrdu(text: string): string {
  if (!text) {
    return '';
  }

  // Simple word-by-word replacement. This will not handle grammar or sentence structure correctly.
  const words = text.toLowerCase().split(/\b(\w+)\b/g); // Split to preserve delimiters and get words
  let translatedText = '';

  for (const word of words) {
    // Check if the word exists in our dictionary
    if (englishToUrduDictionary[word]) {
      translatedText += englishToUrduDictionary[word];
    } else {
      // If not found, keep the original word (or handle as unknown)
      translatedText += word;
    }
  }

  // Capitalize the first letter of the first word if the original started with a capital,
  // this is a very basic attempt to retain some original casing.
  if (text.length > 0 && text[0] === text[0].toUpperCase() && translatedText.length > 0) {
      translatedText = translatedText.charAt(0).toUpperCase() + translatedText.slice(1);
  }

  return translatedText.trim();
}