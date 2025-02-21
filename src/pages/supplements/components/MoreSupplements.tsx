import SupplementCard from "@/components/common/SupplementCard";
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(`/supplements/${id}`); // 클릭 시 해당 영양제 상세 페이지로 이동
  };
  
  return (
    <div className="mt-16">
      <h3 className="text-display2-b text-gray-600 mb-6">영양제 더보기</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {supplements.map((supplement) => (
          <div key={supplement.id} onClick={() => handleCardClick(supplement.id)} className="cursor-pointer">
            <SupplementCard
              key={supplement.id}
              id={supplement.id}
              country={supplement.country}
              productName={supplement.title}
              categories={supplement.tags}
              src={supplement.src}
              scrapped={supplement.isBookmarked}
              width={imageWidth ?? 260} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoreSupplements;
