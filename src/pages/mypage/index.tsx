import Link from "next/link";
import MedicineCard from "@/components/common/MedicineCard";
import PharmacysCard from "./components/PharmacysCard";
import Header from "@/components/layout/Header";

const MyPage = () => {
    const userName = "maengso";
    const userEmail = "maengso@naver.com";
    return (
        <div>
            <div className="w-full h-[188px] bg-background mb-9">
                <Header />
                <div className="max-w-[920px] mx-auto flex items-center gap-4 mt-4">
                    <div className="text-gray-600 text-display1-b">
                        마이페이지
                    </div>
                    <div className="text-gray-300 text-body2-r mt-2">
                        본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로 하며, 제공되는 정보는 의료 전문가의 조언을 대체 하지 않습니다.
                    </div>
                </div>
            </div>    
        
            <div className="max-w-[920px] mx-auto my-10">
                {/* 사용자 프로필 */}
                <div className="w-full px-6 py-3 rounded-lg border border-gray-200 flex justify-between items-center mb-10">
                <div>
                    <div className="flex items-end gap-1">
                        <div className="text-gray-600 text-display2-b">{userName}</div>
                        <div className="text-gray-600 text-display2-m">님</div>
                    </div>
                    <div className="text-gray-300 text-body1-r">{userEmail}</div>
                </div>
                <div className="w-[158px] px-4 py-2 rounded border border-gray-200 flex justify-center items-center">
                    <button className="text-gray-400 text-caption1-r">
                        로그아웃
                    </button>
                </div>
            </div>

            {/* 상비약 저장 목록 */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <Link href="/mypage/medicines" className="text-gray-600 text-display2-b">
                        <h2>상비약 저장 목록 &gt;</h2>
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <MedicineCard />
                    <MedicineCard />
                    <MedicineCard />
                    <MedicineCard />
                </div>
            </div>

            {/* 약국 저장 목록 */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <Link href="/mypage/pharmacys" className="text-gray-600 text-display2-b">
                        <h2>약국 저장 목록 &gt;</h2>
                    </Link>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <PharmacysCard />
                    <PharmacysCard />
                    <PharmacysCard />
                    <PharmacysCard />
                    <PharmacysCard />
                    <PharmacysCard />
                </div>
            </div>
            </div>
        </div>
    );
};

export default MyPage;
