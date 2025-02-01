import React from "react";
import Image from "next/image";
import RatingStars from "./RatingStars";
import { PharmacyDetails } from "../MapComponent";

interface ReviewsProps {
  pharmacy: PharmacyDetails;
}

const Reviews: React.FC<ReviewsProps> = ({ pharmacy }) => {
  if (!pharmacy) {
    return null;
  }

  if (!pharmacy.reviews || pharmacy.reviews.length === 0) {
    return (
      <div className="flex flex-col gap-1 border-t border-gray-100">
        <p className="text-subhead1-sb text-gray-600 mt-4 mb-4">리뷰 한마디</p>
        <p className="text-gray-400">아직 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-subhead1-sb text-gray-600 mt-4 mb-4">리뷰 한마디</p>

      {pharmacy.reviews?.map((review, idx) => (
        <div
          key={idx}
          className="mb-4 pb-4 border-b border-gray-100 last:border-0"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="relative w-6 h-6">
              <Image
                src={review.profile_photo_url}
                alt={review.author_name || "사용자"}
                fill
                className="rounded-full object-cover"
                unoptimized
              />
            </div>
            <span className="text-sm font-medium text-gray-500">
              {review.author_name || "익명"}
            </span>
            <span className="text-sm text-gray-400">
              {review.relative_time_description || ""}
            </span>
          </div>
          <div className="text-sm text-gray-400 pt-1">
            <RatingStars rating={review.rating} userReview={true} />
            <p className="pt-2">{review.text || ""}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
