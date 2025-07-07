"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quotes } from "@/data/quotes";

// Function to get random quotes based on topic
const getRandomQuotes = (topic: string, count: number): { text: string; author: string }[] => {
  let filteredQuotes = topic
    ? quotes.filter((q) => q.topic.toLowerCase().includes(topic.toLowerCase()))
    : quotes;

  // Fallback to all quotes if no match or empty topic
  if (filteredQuotes.length === 0) {
    filteredQuotes = quotes;
  }

  const shuffled = [...filteredQuotes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(({ text, author }) => ({ text, author }));
};

export function QuoteGenerator() {
  const [topic, setTopic] = useState("");
  const [generatedQuotes, setGeneratedQuotes] = useState<
    Array<{ text: string; author: string }>
  >([]);

  const handleGenerateQuotes = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuotes = getRandomQuotes(topic, 3);
    setGeneratedQuotes(newQuotes);
  };

  return (
    // Main container: A slightly complex background to support the blur effect
    // Consider adding a background image or a more dynamic gradient here in globals.css if desired,
    // otherwise, the subtle bg-base-100 with blur will still look clean.
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-base-100 text-base-content font-sans
                    relative overflow-hidden"> 

      <div className="absolute inset-0 backdrop-blur-md"></div>


      <Card className="relative z-10 w-full max-w-2xl lg:max-w-3xl p-8 md:p-10 rounded-xl
                      shadow-2xl card bg-base-200 bg-opacity-80
                      border border-base-content/10
                      transform transition-all duration-300 ease-in-out
                      hover:scale-[1.01] hover:shadow-xl-active">

        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl sm:text-5xl font-extrabold text-primary mb-4 leading-tight">
            Inspirational Quote Generator
          </CardTitle>
          <p className="mt-2 text-xl text-base-content text-opacity-80 max-w-prose mx-auto">
            Discover profound wisdom and ignite your day with a spark of inspiration.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleGenerateQuotes} className="flex flex-col sm:flex-row gap-5 mb-10">
            <Input
              type="text"
              placeholder="Explore topics like Motivation, Success, Learning..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-grow p-4 text-lg input input-bordered input-primary
                         rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-all duration-200"
              aria-label="Enter a topic for quotes"
            />
            <Button
              type="submit"
              className="p-4 text-lg btn btn-primary
                         rounded-lg font-semibold shadow-md
                         transform transition-transform duration-200 hover:scale-105 active:scale-95"
              aria-label="Generate Quotes"
            >
              Generate Quotes
            </Button>
          </form>

          {generatedQuotes.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-center text-base-content mb-6">Your Quotes:</h3>
              {generatedQuotes.map((quote, index) => (
                <Card
                  key={index}
                  className="border-l-4 border-primary shadow-lg card bg-base-100 p-6
                             rounded-lg transform transition-transform duration-300 hover:scale-[1.005] cursor-pointer"
                  role="blockquote"
                >
                  <CardContent className="p-0">
                    <p className="text-xl md:text-2xl italic text-base-content leading-relaxed mb-4">
                      "{quote.text}"
                    </p>
                    <p className="text-lg md:text-xl text-right font-medium text-base-content text-opacity-70">
                      - {quote.author}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {generatedQuotes.length === 0 && (
            <p className="text-center text-base-content text-opacity-60 text-xl mt-8">
              Start by typing a topic and clicking "Generate Quotes"!
            </p>
          )}

          <div className="mt-12 text-center pt-8 border-t border-base-content/10">
            <h4 className="text-xl font-semibold mb-4 text-base-content">Choose Your Theme:</h4>
            <div className="flex justify-center gap-4 flex-wrap">
              {["light", "dark"].map((theme) => (
                <Button
                  key={theme}
                  onClick={() => document.documentElement.setAttribute("data-theme", theme)}
                  className="btn btn-outline btn-lg capitalize rounded-full px-8 py-3
                             font-semibold text-lg hover:text-white transition-colors duration-200"
                  aria-label={`Switch to ${theme} theme`}
                >
                  {theme}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}