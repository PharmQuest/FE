import React from "react";
import { ReviewStarIcon } from "@public/svgs";

interface RatingStarsProps {
  rating: number | undefined;
  userReview?: boolean;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  userReview = false,
  className = "",
}) => {
  if (!rating && rating !== 0) {
    return null;
  }

  const totalStars = 5;
  const fullStars = Math.floor(rating);

  const starElements = [...Array(totalStars)].map((_, index) => (
    <ReviewStarIcon
      key={index}
      className={
        index < fullStars
          ? "fill-point stroke-point"
          : "fill-gray-200 stroke-gray-200"
      }
    />
  ));

  const ratingText = (
    <span
      className={`${
        userReview
          ? "text-subhead3-sb text-gray-600 "
          : "text-subhead1-sb text-gray-400"
      }`}
    >
      {rating.toFixed(1)}
    </span>
  );

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {!userReview && <span className="mr-1">{ratingText}</span>}
      {starElements}
      {userReview && <span className="ml-1">{ratingText}</span>}
    </div>
  );
};

export default RatingStars;
