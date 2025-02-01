import React, { useRef, useState } from "react";
import { PharmacyDetails } from "../MapComponent";
import ActionButtons from "./ActionButtons";
import PharmacyHeader from "./PharmacyHeader";
import TabNavigation from "./TabNavigation";
import DetailPanelContent from "./PanelContent";

interface DetailPanelProps {
  pharmacy: PharmacyDetails | null;
  onClose: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ pharmacy, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "info">(
    "overview"
  );
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  if (!pharmacy) return null;

  const handleDirectionsClick = (type: "depart" | "arrive") => {
    if (!pharmacy.place_id) {
      console.error("Invalid pharmacy place_id");
      return;
    }

    const encodedPharmacyName = encodeURIComponent(pharmacy.name || "");
    let url: string;

    if (type === "depart") {
      url = `https://www.google.com/maps/dir/?api=1&origin=${encodedPharmacyName}&origin_place_id=${pharmacy.place_id}&destination=&hl=ko`;
    } else {
      url = `https://www.google.com/maps/dir/?api=1&destination=${encodedPharmacyName}&destination_place_id=${pharmacy.place_id}&hl=ko`;
    }

    window.open(url, "_blank");
  };

  const scrollToSection = (section: "overview" | "reviews" | "info") => {
    setActiveTab(section);

    if (contentRef.current) {
      if (section === "overview") {
        contentRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        const refs = {
          overview: overviewRef,
          reviews: reviewsRef,
          info: infoRef,
        };

        if (refs[section].current) {
          const topOffset = refs[section].current.offsetTop - 20;
          contentRef.current.scrollTo({
            top: topOffset,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <div className="fixed map:relative map:w-[384px] top-[60px] map:top-0 bottom-0 right-0 left-0 map:inset-auto z-20 map:z-0 bg-black/50 map:bg-transparent flex justify-end">
      <div className="w-full map:w-[384px] h-full flex flex-col shrink-0 bg-white">
        <div className="flex-none">
          <PharmacyHeader pharmacy={pharmacy} onClose={onClose} />
          <ActionButtons onDirectionsClick={handleDirectionsClick} />
          <div className="w-full h-2 bg-gray-100"></div>
          <TabNavigation activeTab={activeTab} onTabChange={scrollToSection} />
        </div>

        <DetailPanelContent
          pharmacy={pharmacy}
          contentRef={contentRef}
          overviewRef={overviewRef}
          reviewsRef={reviewsRef}
          infoRef={infoRef}
        />
      </div>
    </div>
  );
};

export default DetailPanel;
