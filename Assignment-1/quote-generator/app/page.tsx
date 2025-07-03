// quote-generator/app/page.tsx
import { motivationalQuotes } from '../data/quotes'; 

export default function Home() {
  // Selecting a random quote
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  const quote = motivationalQuotes[randomIndex];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8 md:p-12 text-center transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-indigo-700">
          Daily Inspiration
        </h1>

        <blockquote className="text-xl md:text-2xl italic leading-relaxed text-gray-700 mb-6">
          "{quote.quote}"
        </blockquote>

        <p className="text-lg md:text-xl font-semibold text-gray-600">
          - {quote.author}
        </p>
      </div>

      {/* we will add a button here later to generate a new quote without refreshing the page */}
      {/* For now,we are just refreshing the browser to see a new random quote */}
    </main>
  );
}