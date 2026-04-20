import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, onRatingChange, readOnly = false, size = 24 }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);
        
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => onRatingChange && onRatingChange(star)}
            onMouseEnter={() => !readOnly && setHoverRating(star)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            className={`${readOnly ? 'cursor-default' : 'cursor-pointer transition-transform hover:scale-110'} focus:outline-none`}
            aria-label={`Rate ${star} stars`}
          >
            <Star
              size={size}
              className={`${
                isFilled 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'fill-transparent text-gray-700'
              } transition-colors duration-200`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
