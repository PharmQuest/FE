import SupplementCard from "./SupplementCard";

interface MoreSupplementsProps {
  supplements: {
    id?: string;
    country: string;
    title: string;
    tags: string[];
    isBookmarked?: boolean;
  }[];
  imageWidth?: number; // 이미지 크기를 조절할 수 있도록 prop 추가
}

function MoreSupplements({ supplements, imageWidth = 168 }: MoreSupplementsProps) {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-gray-600 mb-6">영양제 더보기</h3>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {supplements?.map((supplement) => (

          <SupplementCard
            key={supplement.id}
            country={supplement.country}
            title={supplement.title}
            tags={supplement.tags}
            width={imageWidth} // 이미지 크기 조절 가능하도록 추가
          />
        ))}
      </div>
    </div>
  );
}

export default MoreSupplements;
