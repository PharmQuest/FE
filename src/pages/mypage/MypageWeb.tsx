import Link from "next/link";

interface MyPageProps {
  userName: string;
  userEmail: string;
  medicines?: string[];
  pharmacys?: string[];
  supplements?: string[];
}

const MyPageWeb: React.FC<MyPageProps> = ({
  userName,
  userEmail,
  medicines = [],
  pharmacys = [],
  supplements = [],
}) => {
  return (
    <div className="w-full max-w-[920px] mx-auto my-10 px-8">
      {/* 사용자 프로필 */}
      <div className="w-full px-6 py-3 rounded-lg border border-gray-200 flex justify-between items-center mb-6">
        <div>
          <div className="flex items-end gap-1">
            <div className="text-gray-600 text-display2-b font-bold">{userName}</div>
            <div className="text-gray-600 text-display2-m">님</div>
          </div>
          <div className="text-gray-400 text-body1-r">{userEmail}</div>
        </div>
        <button className="w-[100px] px-4 py-2 rounded border border-gray-200 text-gray-400 text-caption1-r">
          로그아웃
        </button>
      </div>

      {/* 저장 목록 */}
      {[ 
        { title: "상비약 저장 목록", href: "/mypage/medicines", data: medicines, cols: "md:grid-cols-2" },
        { title: "약국 저장 목록", href: "/mypage/pharmacys", data: pharmacys, cols: "md:grid-cols-3" },
        { title: "영양제 저장 목록", href: "/mypage/supplements", data: supplements, cols: "md:grid-cols-3" }
      ].map((section, index) => (
        <div key={index} className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <Link href={section.href} className="text-gray-600 text-display2-b">
              <h2>{section.title} &gt;</h2>
            </Link>
          </div>
          {section.data.length > 0 ? (
            <div className={`grid gap-4 grid-cols-1 ${section.cols}`}>
              {section.data.map((item, idx) => (
                <div key={idx} className="border border-gray-200 p-4 rounded-lg">
                  {/* 카드 컴포넌트 자리 */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-body1-r text-center md:text-left">
              저장한 항목이 없어요. <br />
              <Link href={section.href} className="text-primary-500 underline">
                추가하러 가기
              </Link>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyPageWeb;
