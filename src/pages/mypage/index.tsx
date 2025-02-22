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
import useModalStore from "@/store/useModalStore";

interface MedicineResponse {
  code: string;
  message: string;
  result: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: {
      id: number;
      productName: string;
      generalName: string;
      productImage: string;
      categories: string;
      country: string;
      scrapped: boolean;
    }[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
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
    first: boolean;
    last: boolean;
    empty: boolean;
  };
  isSuccess: boolean;
}

interface PharmacyResponse {
  code: string;
  message: string;
  result: {
    pharmacies: {
      name: string;
      region: string;
      latitude: number;
      longitude: number;
      isScrapped: boolean;
      place_id: string;
      img_url: string;
    }[];
    total_elements: number;
    total_pages: number;
    current_page: number;
    elements_per_page: number;
  };
  isSuccess: boolean;
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

const MyPage = () => {

  const router = useRouter();

  const { isLoggedIn, userName, email, logOut } = useAuthStore();
  const { setNoticeModalText, setIsNoticeModalOpen } = useModalStore();

  const handleLogout = () => {
    logOut();
  }

  useEffect(() => {
    if(isLoggedIn === false){
      router.replace("/login")
      setNoticeModalText("로그인이 필요한 서비스입니다.")
      setIsNoticeModalOpen(true);
    }
  }, [isLoggedIn])

  const { data: medicineData, isLoading: isMedLoading } = useQuery<MedicineResponse>({
    queryKey: ["mypageMedicines"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/mypage/medicine?page=1&country=${encodeURIComponent("ALL")}`
      );
      return response.data;
    },
  });
  if (isMedLoading)
    console.warn("마이페이지 상비약 로딩 중..");
  const [medicines, setMedicines] = useState<MedicineResponse['result']['content']>([]);
  
  useEffect(() => {
    if (medicineData?.result?.content) {
      setMedicines(medicineData.result.content);
    }
  }, [medicineData]);

  const handleMedicineBookmarkToggle = (id: number) => {
    setMedicines(prev => prev.filter(medicine => medicine.id !== id));
  };
  
  const { data: pharmacyData, isLoading:isPharLoading } = useQuery<PharmacyResponse>({
    queryKey: ["mypagePharmacys"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/mypage/pharmacy?country=ALL&page=1&size=4`
      );
      return response.data;
    },
  });
  if (isPharLoading)
    console.warn("마이페이지 약국 로딩 중..");
  const [pharmacies, setPharmacies] = useState<PharmacyResponse['result']['pharmacies']>([]);
  
  useEffect(() => {
    if (pharmacyData?.result?.pharmacies) {
      setPharmacies(pharmacyData.result.pharmacies);
    }
  }, [pharmacyData]);

  const handlePharmacyBookmarkToggle = (place_id: string) => {
    setPharmacies(prev => prev.filter(pharmacy => pharmacy.place_id !== place_id));
  };
  
  const { data: supplementsData, isLoading:isSuppLoading } = useQuery<SupplementResponse>({
    queryKey: ["mypageSupps"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/mypage/supplements?page=1&category=${encodeURIComponent("전체")}`
      );
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

  const handleSupplementBookmarkToggle = (id: number) => {
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
          <div className="text-gray-400 md:text-body1-r text-m-body2-r">{email}</div>
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
            {medicines.slice(0, 4).map((medicine) => (
              <MedicineCard key={medicine.id} {...medicine} onBookmarkToggle={handleMedicineBookmarkToggle}
               medicineTableId={medicine.id} brandName={medicine.productName} genericName={medicine.generalName} splSetId={""} imgUrl={medicine.productImage} category={medicine.categories} country={medicine.country} />
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
        {pharmacies.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pharmacies.map((pharmacy) => (
              <PharmacysCard key={pharmacy.place_id} {...pharmacy} onBookmarkToggle={handlePharmacyBookmarkToggle} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 md:text-body1-r text-m-body1-r text-left md:text-center">
            저장한 약국이 없어요. <br />
            <Link href="/map" className="text-gray-400 underline">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {supplements.slice(0, 10).map((supplement) => (
              <SupplementCard key={supplement.id} {...supplement} src={supplement.image} onBookmarkToggle={handleSupplementBookmarkToggle}/>
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
