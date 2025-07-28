'use client'

import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingInputProps {
  initialRating: number;
  onRate: (rating: number) => void;
  className?: string;
}

export function StarRatingInput({ initialRating, onRate, className = 'h-6 w-6' }: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(initialRating);

  const handleRate = (rating: number) => {
    setCurrentRating(rating);
    onRate(rating);
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Star
            key={ratingValue}
            className={`${className} cursor-pointer transition-colors`}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRate(ratingValue)}
            fill={ratingValue <= (hoverRating || currentRating) ? '#facc15' : 'none'}
            stroke={ratingValue <= (hoverRating || currentRating) ? '#facc15' : 'currentColor'}
          />
        );
      })}
    </div>
  );
}