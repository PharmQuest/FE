import Link from "next/link";

interface MyPageProps {
  userName: string;
  userEmail: string;
  medicines?: string[];
  pharmacys?: string[];
  supplements?: string[];
}

const MyPageMobile: React.FC<MyPageProps> = ({
  userName,
  userEmail,
  medicines = [],
  pharmacys = [],
  supplements = [],
}) => {
  return (
    <div className="w-full px-4 my-10">
      {/* 사용자 프로필 */}
      <div className="w-full px-6 py-4 rounded-lg border border-gray-200 flex justify-between items-center mb-6">
        <div>
          <div className="text-gray-600 text-display2-b font-bold">{userName}님</div>
          <div className="text-gray-400 text-body1-r">{userEmail}</div>
        </div>
        <button className="px-4 py-2 rounded border border-gray-200 text-gray-400 text-caption1-r">
          로그아웃
        </button>
      </div>

      {/* 메뉴 리스트 */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {[
          { title: "나의 활동", href: "/mypage" },
          { title: "상비약 저장 목록", href: "/mypage/medicines", data: medicines },
          { title: "약국 저장 목록", href: "/mypage/pharmacys", data: pharmacys },
          { title: "영양제 저장 목록", href: "/mypage/supplements", data: supplements }
        ].map((item, index) => (
          <div key={index} className="border-b last:border-none">
            <Link href={item.href} className="block px-4 py-4 flex justify-between items-center">
              <span className="text-gray-600 text-display2-b">{item.title}</span>
              <span className="text-gray-400">&gt;</span>
            </Link>
            {item.data && item.data.length === 0 && (
              <p className="text-center text-gray-400 text-body1-r py-2">
                저장한 항목이 없어요.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPageMobile;
