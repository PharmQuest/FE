import React from "react";
import { ReviewStarIcon } from "@public/svgs";

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-1">
      <span className="mr-1 text-subhead1-sb text-gray-400">
        {rating.toFixed(1)}
      </span>
      {[...Array(totalStars)].map((_, index) => (
        <ReviewStarIcon
          key={index}
          className={
            index < fullStars
              ? "fill-point stroke-point"
              : "fill-gray-200 stroke-gray-200"
          }
        />
      ))}
    </div>
  );
};

export default RatingStars;
