import Link from "next/link";
import MedicineCard from "@/components/common/MedicineCard";
import PharmacysCard from "./components/PharmacysCard";

interface MyPageProps {
  userName: string;
  userEmail: string;
}

const MyPage: React.FC<MyPageProps> = ({ userName, userEmail }) => {
  return (
    <div>
      <div className="w-full max-w-[920px] mx-auto my-10 px-4 md:px-8">
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
            <button className="text-gray-400 text-caption1-r">로그아웃</button>
          </div>
        </div>

        {/* 상비약 저장 목록 */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <Link href="/mypage/medicines" className="text-gray-600 text-display2-b">
              <h2>상비약 저장 목록 &gt;</h2>
            </Link>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            }}
          >
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
