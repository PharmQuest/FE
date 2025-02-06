import SupplementCard from "@/components/common/SupplementCard";

interface MoreSupplementsProps {
  supplements: {
    id: number;
    country: string;
    title: string;
    tags: string[];
    isBookmarked?: boolean;
    src?: string;
  }[];
  imageWidth?: number; 
}

function MoreSupplements({ supplements=[], imageWidth }: MoreSupplementsProps) {
  return (
    <div className="mt-16">
      <h3 className="text-display2-b text-gray-600 mb-6">영양제 더보기</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {supplements.map((supplement) => (
          <SupplementCard
            key={supplement.id}
            id={supplement.id}
            country={supplement.country}
            title={supplement.title}
            tags={supplement.tags}
            src={supplement.src}
            width={imageWidth ?? 260} 
          />
        ))}
      </div>
    </div>
  );
}

export default MoreSupplements;
