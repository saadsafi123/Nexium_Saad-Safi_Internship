// // src/lib/translator.ts

// // This is a very small, hardcoded dictionary for demonstration.
// // In a real scenario, this would be massive, dynamically loaded, or use a translation API.
// const englishToUrduDictionary: { [key: string]: string } = {
//   "hello": "ہیلو",
//   "world": "دنیا",
//   "blog": "بلاگ",
//   "summary": "خلاصہ",
//   "article": "مضمون",
//   "content": "مواد",
//   "great": "بہت اچھا",
//   "good": "اچھا",
//   "morning": "صبح",
//   "day": "دن",
//   "information": "معلومات",
//   "technology": "ٹیکنالوجی",
//   "science": "سائنس",
//   "news": "خبریں",
//   "read": "پڑھنا",
//   "important": "اہم",
//   "welcome": "خوش آمدید",
//   "this": "یہ",
//   "is": "ہے",
//   "a": "ایک",
//   "and": "اور",
//   "the": "کے",
//   "no content to summarize": "خلاصہ کرنے کے لیے کوئی مواد نہیں",
//   // Add more words/phrases as needed for better "simulation"
// };

// /**
//  * Simulates translation from English to Urdu using a predefined dictionary.
//  * This is a highly simplified approach for assignment purposes.
//  * @param text The English text to translate.
//  * @returns The simulated Urdu translation.
//  */
// export function translateToUrdu(text: string): string {
//   if (!text) {
//     return '';
//   }

//   // Simple word-by-word replacement. This will not handle grammar or sentence structure correctly.
//   const words = text.toLowerCase().split(/\b(\w+)\b/g); // Split to preserve delimiters and get words
//   let translatedText = '';

//   for (const word of words) {
//     // Check if the word exists in our dictionary
//     if (englishToUrduDictionary[word]) {
//       translatedText += englishToUrduDictionary[word];
//     } else {
//       // If not found, keep the original word (or handle as unknown)
//       translatedText += word;
//     }
//   }

//   // Capitalize the first letter of the first word if the original started with a capital,
//   // this is a very basic attempt to retain some original casing.
//   if (text.length > 0 && text[0] === text[0].toUpperCase() && translatedText.length > 0) {
//       translatedText = translatedText.charAt(0).toUpperCase() + translatedText.slice(1);
//   }

//   return translatedText.trim();
// }

// src/lib/translator.ts

// This dictionary is for DEMONSTRATION PURPOSES ONLY to show how more words can be added.
// It is NOT a comprehensive or grammatically correct translation solution.
// For "best" translation, you MUST use a dedicated Translation API.
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
  "machine": "مشین",
  "learning": "سیکھنے", // "سیکھنا" (to learn) - this highlights grammar issue
  "machine learning": "مشین لرننگ", // Example of a phrase, order matters in processing
  "generative": "جنریٹو",
  "ai": "اے آئی",
  "artificial": "مصنوعی",
  "intelligence": "ذہانت",
  "artificial intelligence": "مصنوعی ذہانت",
  "course": "کورس",
  "youtube": "یوٹیوب",
  "channel": "چینل",
  "will": "گا", // Context dependent
  "introduce": "متعارف",
  "you": "آپ کو",
  "to": "کو",
  "fundamentals": "بنیادی باتیں",
  "how": "کیسے",
  "it": "یہ",
  "differs": "مختلف",
  "from": "سے",
  "traditional": "روایتی",
  "programming": "پروگرامنگ",
  "its": "اس کی",
  "real": "حقیقی",
  "world ": "دنیا",
  "applications": "ایپلی کیشنز",
  "ever": "کبھی",
  "been": "ہوا ہے",
  "curious": "متجسس",
  "about": "کے بارے میں",
  "systems": "سسٹم",
  "work": "کام",
  "provides": "فراہم کرتا ہے",
  "structured": "ساختہ",
  "introduction": "تعارف",
  "field": "میدان",
  "covering": "کا احاطہ",
  "everything": "سب کچھ",
  "basics": "بنیادی",
  "cutting-edge": "جدید ترین",
  "innovations": "اختراعات",
  "revolutionizing": "انقلاب برپا کر رہا ہے",
  "industries": "صنعتوں",
  "enabling": "قابل بنانا",
  "computers": "کمپیوٹرز",
  "learn": "سیکھنا",
  "from ": "سے",
  "data": "ڈیٹا",
  "recognize": "پہچاننا",
  "patterns": "پیٹرن",
  "make": "بنانا",
  "decisions": "فیصلے",
  "without": "کے بغیر",
  "explicit": "واضح",
  "Beau Carnes": "بیو کارنز", // Proper nouns usually remain untranslated or transliterated
  "freecodecamp": "فری کوڈ کیمپ", // Transliteration
  "org": "آرگ", // Common abbreviation
  "published": "شائع کیا",
  "we": "ہم",
  "just": "بس",
  "had": "تھا",
  "has": "ہے",
  "do": "کرنا",
  "does": "کرتا ہے",
  "did": "کیا",
  "not": "نہیں",
  "no": "نہیں",
  "yes": "ہاں",
  "so": "تو",
  "into": "میں",
  "then": "پھر",
  "than": "سے زیادہ",
  "when": "جب",
  "where": "کہاں",
  "why": "کیوں",
  "who": "کون",
  "which": "کونسا",
  "what": "کیا",
  "whom": "کس کو",
  "there": "وہاں",
  "here": "یہاں",
  "if": "اگر",
  "else": "دوسرا",
  "some": "کچھ",
  "any": "کوئی",
  "many": "بہت سے",
  "much": "زیادہ",
  "more": "مزید",
  "most": "سب سے زیادہ",
  "such": "ایسا",
  "only": "صرف",
  "very": "بہت",
  "even": "بھی",
  "up": "اوپر",
  "down": "نیچے",
  "out": "باہر",
  "off": "بند",
  "over": "اوپر",
  "under": "نیچے",
  "again": "دوبارہ",
  "further": "مزید",
  "once": "ایک بار",
  "all": "تمام",
  "both": "دونوں",
  "each": "ہر ایک",
  "few": "چند",
  "other": "دوسرے",
  "own": "اپنا",
  "same": "وہی",
  "too": "بھی",
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

  // A slightly more advanced strategy: try to replace phrases before individual words
  // This is still very basic but helps with terms like "machine learning"
  let translatedText = text;

  // Sort phrases by length descending to prioritize longer matches
  const sortedPhrases = Object.keys(englishToUrduDictionary)
    .filter(key => key.includes(' '))
    .sort((a, b) => b.length - a.length);

  // Replace phrases first
  for (const phrase of sortedPhrases) {
    const translation = englishToUrduDictionary[phrase];
    if (translation) {
      // Use regex to replace whole words only, case-insensitive
      const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
      translatedText = translatedText.replace(regex, translation);
    }
  }

  // Then, replace individual words for remaining text
  // Split into words and non-words (e.g., spaces, punctuation)
  const parts = translatedText.split(/(\b\w+\b)/g);
  let finalTranslatedText = '';

  for (const part of parts) {
    const lowerPart = part.toLowerCase();
    if (englishToUrduDictionary[lowerPart]) {
      finalTranslatedText += englishToUrduDictionary[lowerPart];
    } else {
      finalTranslatedText += part; // Keep original if not found
    }
  }

  // Capitalize the first letter if the original text started with a capital.
  // This is a very basic attempt to retain some original casing.
  if (text.length > 0 && text[0] === text[0].toUpperCase() && finalTranslatedText.length > 0) {
    finalTranslatedText = finalTranslatedText.charAt(0).toUpperCase() + finalTranslatedText.slice(1);
  }

  return finalTranslatedText.trim();
}