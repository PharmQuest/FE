import Link from "next/link";
import { ArrowRightIcon } from "@public/svgs";
import MedicineCard from "@/components/common/MedicineCard";
import PharmacysCard from "./components/PharmacysCard";
import SupplementCard from "@/components/common/SupplementCard";
import useAuthStore from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/apis/axios-instance";
import { useQuery } from "@tanstack/react-query";

interface Medicine {
  id: number;
  name: string;
  type: string;
}

interface Pharmacy {
  id: number;
  pharmacyName: string;
  status: boolean;
  closingTime: string;
  distance: string;
  location: string;
}

interface SupplementResponse {
  code: string;
  message: string;
  result: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: {
      id: number;
      name: string;
      country: string;
      productName: string;
      image: string;
      brand: string;
      categories: string[];
      scrapped: boolean;
    }[];
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageable: {
      offset: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      paged: boolean;
      pageNumber: number;
      pageSize: number;
      unpaged: boolean;
    };
  };
  isSuccess: boolean;
}

// interface Supplement {
//   id: number;
//   country: string;
//   title: string;
//   tags: string[];
//   isBookmarked: boolean;
// }

interface MyPageProps {
  userName: string;
  userEmail: string;
  medicines?: Medicine[];
  pharmacys?: Pharmacy[];
  // supplements?: Supplement[];
}

const MyPage: React.FC<MyPageProps> = ({
  userEmail = "maengso@naver.com",
  medicines = [
    { id: 1, name: "타이레놀", type: "진통제" },
    { id: 2, name: "판피린", type: "감기약" },
  ],
  pharmacys = [
    { id: 1, pharmacyName: "온누리약국", status: true, closingTime: "19:00", distance: "700m", location: "서울 강남구 논현동" },
    { id: 2, pharmacyName: "튼튼약국", status: false, closingTime: "17:00", distance: "600m", location: "서울 종로구 종로3가" },
    { id: 3, pharmacyName: "온누리약국", status: true, closingTime: "19:00", distance: "700m", location: "서울 강남구 논현동" },
    { id: 4, pharmacyName: "튼튼약국", status: false, closingTime: "17:00", distance: "600m", location: "서울 종로구 종로3가" },
  ],
  // supplements = [
  //   { id: 1, country: "미국", title: "네이처메이드", tags: ["면역력강화", "피부건강"], isBookmarked: true },
  //   { id: 2, country: "한국", title: "홍삼정", tags: ["면역력", "활력"], isBookmarked: false },
  //   { id: 3, country: "한국", title: "홍삼정", tags: ["면역력", "활력"], isBookmarked: false },
  //   { id: 4, country: "미국", title: "네이처메이드", tags: ["면역력강화", "피부건강"], isBookmarked: true },
  //   { id: 5, country: "한국", title: "홍삼정", tags: ["면역력", "활력"], isBookmarked: false },
  //   { id: 6, country: "한국", title: "홍삼정", tags: ["면역력", "활력"], isBookmarked: false },
  // ],
}) => {

  const router = useRouter();

  const { isLoggedIn, userName, logOut } = useAuthStore();

  const handleLogout = () => {
    logOut();
  }

  useEffect(() => {
    if(isLoggedIn === false){
      router.push("/login")
    }
  }, [isLoggedIn])

  // const [currentPage, setCurrentPage] = useState(1);
  const { data: supplementsData, isLoading:isSuppLoading } = useQuery<SupplementResponse>({
    queryKey: ["mypageSupps"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/mypage/supplements?page=1&category=${encodeURIComponent("전체")}`
      );
      console.log("mypage supp=", response.data);
      return response.data;
    },
  });
  if (isSuppLoading)
    console.warn("마이페이지 영양제 로딩 중..");
  const [supplements, setSupplements] = useState<SupplementResponse['result']['content']>([]);

  useEffect(() => {
    if (supplementsData?.result?.content) {
      setSupplements(supplementsData.result.content);
    }
  }, [supplementsData]);

  const handleBookmarkToggle = (id: number) => {
    setSupplements(prev => prev.filter(supplement => supplement.id !== id));
  };

  return (
    <div className="xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto w-[calc(100%-40px)] mx-5 py-8">
      {/* 사용자 프로필 */}
      <div className="w-full px-6 py-3 border border-gray-200 md:pl-4 flex justify-between items-center mb-10 border-b">
        <div>
          <div className="flex items-end gap-1">
            <div className="text-gray-600 md:text-display2-b text-m-headline1-b">{userName}</div>
            <div className="text-gray-600 md:text-display2-m text-m-headline1-b ">님</div>
          </div>
          <div className="text-gray-400 md:text-body1-r text-m-body2-r">{userEmail}</div>
        </div>
        <div 
          className="w-[100px] px-4 py-2 rounded border border-gray-200 flex justify-center items-center cursor-pointer"
          onClick={handleLogout}>
          <button 
            className="text-gray-400 text-caption1-r">로그아웃</button>
        </div>
      </div>

      {/* 나의 활동 */}
      <div className="mb-12 pb-6 md:pb-0">
        <div className="flex justify-between items-center mb-4">
          <Link href="/community/activities" className="text-gray-600 md:text-display2-b text-headline-b flex items-center gap-1">
            <h2>나의 활동</h2>
            <ArrowRightIcon className="w-6 text-gray-500 h-4" />
          </Link>
        </div>
        <p className="text-gray-400 md:text-body1-r text-m-body1-r text-left md:text-center">
          나의 커뮤니티 활동을 확인해보세요. <br />
          게시글/댓글/스크랩/알림 내용을 확인할 수 있어요.
        </p>
      </div>

      {/* 상비약 저장 목록 */}
      <div className="mb-12 pb-6 md:pb-0">
        <div className="flex justify-between items-center mb-4">
          <Link href="/mypage/medicines" className="text-gray-600 text-headline-b md:text-display2-b flex items-center gap-1">
            <h2>상비약 저장 목록</h2>
            <ArrowRightIcon className="w-6 text-gray-500 h-4" />
          </Link>
        </div>
        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {medicines.map((medicine) => (
              <MedicineCard medicineTableId={0} brandName={""} genericName={""} splSetId={""} imgUrl={""} category={""} country={""} key={medicine.id} {...medicine} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 md:text-body1-r text-m-body1-r text-left md:text-center">
            저장한 상비약이 없어요. <br />
            <Link href="/medicines" className="text-gray-400 underline">
              상비약 리스트
            </Link>
            에서 항목을 추가해보세요!
          </p>
        )}
      </div>

      {/* 약국 저장 목록 */}
      <div className="mb-12 pb-6 md:pb-0">
        <div className="flex justify-between items-center mb-4">
          <Link href="/mypage/pharmacys" className="text-gray-600 text-headline-b md:text-display2-b flex items-center gap-1">
            <h2>약국 저장 목록</h2>
            <ArrowRightIcon className="w-6 text-gray-500 h-4" />
          </Link>
        </div>
        {pharmacys.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pharmacys.map((pharmacy) => (
              <PharmacysCard key={pharmacy.id} {...pharmacy} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 md:text-body1-r text-m-body1-r text-left md:text-center">
            저장한 약국이 없어요. <br />
            <Link href="/pharmacys" className="text-gray-400 underline">
              약국 찾기
            </Link>
            에서 항목을 추가해보세요!
          </p>
        )}
      </div>

      {/* 영양제 저장 목록 */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <Link href="/mypage/supplement" className="text-gray-600 text-headline-b md:text-display2-b flex items-center gap-1">
            <h2>영양제 저장 목록</h2>
            <ArrowRightIcon className="w-6 text-gray-500 h-4" />
          </Link>
        </div>
        {supplements.length > 0 ? (
        // {supplementsData?.result?.content && supplementsData.result.content.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* {supplements.map((supplement) => (
              <SupplementCard key={supplement.id} {...supplement} />
            ))} */}
            {supplements.slice(0, 10).map((supplement) => (
            // {supplementsData?.result.content.slice(0, 10).map((supplement) => (
              <SupplementCard key={supplement.id}
                              id={supplement.id}
                              country={supplement.country}
                              title={supplement.productName}
                              tags={supplement.categories}
                              isBookmarked={supplement.scrapped}
                              src={supplement.image}
                              onBookmarkToggle={handleBookmarkToggle}/>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-m-body1-r md:text-body1-r text-left md:text-center">
            저장한 영양제가 없어요. <br />
            <Link href="/supplements" className="text-gray-400 underline">
              해외 인기 영양제
            </Link>
            에서 항목을 추가해보세요!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyPage;
