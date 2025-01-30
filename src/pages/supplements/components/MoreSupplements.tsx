import SupplementCard from "@/components/common/SupplementCard";

interface MoreSupplementsProps {
  supplements: {
    id?: string;
    country: string;
    title: string;
    tags: string[];
    isBookmarked?: boolean;
  }[];
  imageWidth?: number; 
}

function MoreSupplements({ supplements=[], imageWidth = 168 }: MoreSupplementsProps) {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-gray-600 mb-6">영양제 더보기</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supplements.map((supplement) => (
          <SupplementCard
            key={supplement.id}
            country={supplement.country}
            title={supplement.title}
            tags={supplement.tags}
            width={imageWidth ?? 168} 
          />
        ))}
      </div>
    </div>
  );
}

export default MoreSupplements;
