import { Star } from 'lucide-react';

interface StarRatingDisplayProps {
  rating: number | null;
  totalStars?: number;
  className?: string;
}

export function StarRatingDisplay({ rating, totalStars = 5, className = 'h-4 w-4' }: StarRatingDisplayProps) {
  const filledStars = rating || 0;

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          className={`${className} ${
            index < filledStars
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  );
}