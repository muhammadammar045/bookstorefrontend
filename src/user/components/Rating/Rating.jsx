import React, { useState, useEffect } from "react";

function Rating({ reviewRating = 0 }) {
  const [rating, setRating] = useState(reviewRating);

  useEffect(() => {
    setRating(reviewRating);
  }, [reviewRating]);

  const getStarFillPercentage = (index) => {
    const starValue = index + 1;
    if (rating >= starValue) {
      return 100; // Full star
    } else if (rating < starValue - 1) {
      return 0; // Empty star
    } else {
      return Math.round((rating - index) * 100); // Partial star
    }
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="relative text-2xl text-gray-400"
        >
          <div
            className={`absolute left-0 top-0 h-full overflow-hidden`}
            style={{ width: `${getStarFillPercentage(i)}%` }}
          >
            <span className="text-yellow-500">★</span>
          </div>
          <span className="text-gray-400">★</span>
        </div>
      ))}
    </div>
  );
}

export default Rating;
