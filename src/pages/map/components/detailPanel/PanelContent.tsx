import React from "react";
import { PharmacyDetails } from "../MapComponent";
import Overview from "./Overview";
import Reviews from "./Reviews";
import Info from "./Info";

interface DetailPanelContentProps {
  pharmacy: PharmacyDetails;
  contentRef: React.RefObject<HTMLDivElement | null>;
  overviewRef: React.RefObject<HTMLDivElement | null>;
  reviewsRef: React.RefObject<HTMLDivElement | null>;
  infoRef: React.RefObject<HTMLDivElement | null>;
}

const DetailPanelContent: React.FC<DetailPanelContentProps> = ({
  pharmacy,
  contentRef,
  overviewRef,
  reviewsRef,
  infoRef,
}) => {
  return (
    <div
      ref={contentRef}
      className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide"
    >
      <div className="space-y-4 p-5">
        <div ref={overviewRef}>
          <Overview pharmacy={pharmacy} />
        </div>

        <div ref={reviewsRef} className="border-t border-gray-100">
          <Reviews pharmacy={pharmacy} />
        </div>

        <div ref={infoRef} className="mt-6 border-t border-gray-100">
          <Info />
        </div>
      </div>
    </div>
  );
};

export default DetailPanelContent;
