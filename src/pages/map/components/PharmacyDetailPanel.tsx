import React from "react";
import { PharmacyDetails } from "./MapComponent";
import IsOpenTag from "./IsOpenTag";
import { GlobeIcon } from "@public/svgs";
import RatingStars from "./RatingStars";
import Image from "next/image";

interface DetailPanelProps {
  pharmacy: PharmacyDetails | null;
  onClose: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ pharmacy, onClose }) => {
  if (!pharmacy) return null;

  return (
    <div className="w-[384px] flex shrink-0 overflow-y-scroll overflow-x-hidden bg-white border-l border-gray-100">
      <div className="relative w-full">
        <div className="relative">
          {pharmacy.photos?.[0] ? (
            <div className="relative h-[220px]">
              <Image
                src={pharmacy.photos[0].getUrl({
                  maxWidth: 384,
                  maxHeight: 220,
                })}
                alt={pharmacy.name || "약국 이미지"}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent to-40% rounded-t-lg" />
            </div>
          ) : (
            <div className="w-[384px] h-[220px] bg-gray-200 rounded-t-lg" />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full text-gray-600 hover:bg-white"
          >
            ×
          </button>
        </div>

        <div className="p-4">
          <div className="flex flex-col gap-2 border-b pb-4 border-gray-100">
            <div className="flex flex-row gap-2 items-center">
              <p className="text-headline-m text-gray-600">{pharmacy.name}</p>
              <IsOpenTag isOpen={pharmacy.opening_hours?.isOpen() ?? false} />
            </div>
            {pharmacy.rating && <RatingStars rating={pharmacy.rating} />}
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex flex-row items-center gap-2">
              <GlobeIcon />
              <p className="text-body2-r text-gray-500">
                {pharmacy.formatted_address}
              </p>
            </div>

            {pharmacy.opening_hours && (
              <div>
                <ul className="text-body2-r text-gray-500 space-y-1">
                  {pharmacy.opening_hours.weekday_text?.map((hours, idx) => (
                    <li key={idx}>{hours}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-row items-center gap-2">
              <GlobeIcon />
              <p className="text-body2-r text-gray-500">
                {pharmacy.formatted_phone_number || "정보 없음"}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3 border-t border-gray-100">
                <p className="text-subhead1-sb text-gray-600 mt-4">
                  리뷰 한마디
                </p>
              </div>
              {pharmacy.reviews?.map((review, idx) => (
                <div
                  key={idx}
                  className="mb-4 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative w-6 h-6">
                      <Image
                        src={review.profile_photo_url}
                        alt={review.author_name}
                        fill
                        className="rounded-full object-cover"
                        unoptimized
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {review.author_name}
                    </span>
                    <span className="text-sm text-gray-400">
                      {review.relative_time_description}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">{review.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
