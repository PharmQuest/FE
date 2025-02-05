import Link from "next/link";
import { ArrowRightIcon } from "@public/svgs";
import MedicineCard from "@/components/common/MedicineCard";
import PharmacysCard from "./components/PharmacysCard";
import SupplementCard from "@/components/common/SupplementCard";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface MyPageProps {
  userName: string;
  userEmail: string;
  medicines?: [];
  pharmacys?: [];
  supplements?: [];
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
   supplements = [
    { id: 1, country: "미국", title: "네이처메이드", tags: ["면역력강화", "피부건강"], isBookmarked: true },
    { id: 2, country: "한국", title: "홍삼정", tags: ["면역력", "활력"], isBookmarked: false },
  ],
}) => {

  const router = useRouter();

  const { isLoggedIn, userName, logOut } = useAuthStore();

  const handleLogout = () => {
    logOut();
  }

  useEffect(() => {
    if(!isLoggedIn){
      router.push("/login")
    }
  }, [isLoggedIn])

  return (
    <div className="xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto w-[calc(100%-40px)] mx-5 py-8">
      {/* 사용자 프로필 */}
      <div className="w-full px-6 py-3 border border-gray-200 md:pl-4 flex justify-between items-center mb-10 border-b">
        <div>
          <div className="flex items-end gap-1">
            <div className="text-gray-600 text-display2-b font-bold">{userName}</div>
            <div className="text-gray-600 text-display2-m">님</div>
          </div>
          <div className="text-gray-400 text-body1-r">{userEmail}</div>
        </div>
        <div className="w-[100px] px-4 py-2 rounded border border-gray-200 flex justify-center items-center">
          <button 
            className="text-gray-400 text-caption1-r"
            onClick={handleLogout}>로그아웃</button>
        </div>
      </div>

      {/* 나의 활동 */}
      <div className="mb-12 pb-6 md:pb-0">
        <div className="flex justify-between items-center mb-4">
          <Link href="/community/activities" className="text-gray-600 text-display2-b flex items-center gap-1">
            <h2>나의 활동</h2>
            <ArrowRightIcon className="w-6 text-gray-500 h-4" />
          </Link>
        </div>
        <p className="text-gray-400 text-body1-r text-left md:text-center">
          나의 커뮤니티 활동을 확인해보세요. <br />
          게시글/댓글/스크랩/알림 내용을 확인할 수 있어요.
        </p>
      </div>

      {/* 상비약 저장 목록 */}
      <div className="mb-12 pb-6 md:pb-0">
        <div className="flex justify-between items-center mb-4">
          <Link href="/mypage/medicines" className="text-gray-600 text-display2-b flex items-center gap-1">
            <h2>상비약 저장 목록</h2>
            <ArrowRightIcon className="w-6 text-gray-500 h-4" />
          </Link>
        </div>
        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {medicines.map((medicine) => (
              <MedicineCard key={medicine.id} {...medicine} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-body1-r text-left md:text-center">
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
          <Link href="/mypage/pharmacys" className="text-gray-600 text-display2-b flex items-center gap-1">
            <h2 className="test-display2-b">약국 저장 목록</h2>
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
          <p className="text-gray-400 text-body1-r text-left md:text-center">
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
          <Link href="/mypage/supplement" className="text-gray-600 text-display2-b flex items-center gap-1">
            <h2>영양제 저장 목록</h2>
            <ArrowRightIcon className="w-6 text-gray-500 h-4" />
          </Link>
        </div>
        {supplements.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supplements.map((supplement) => (
              <SupplementCard key={supplement.id} {...supplement} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-body1-r text-left md:text-center">
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
