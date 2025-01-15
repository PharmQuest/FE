import { BookmarkIcon, BookmarkOnIcon } from "@public/svgs";
import { useRouter } from "next/router";
import { useState } from "react";

const MedicineCard = () => {

  const router = useRouter();

  const [isBookmark, setIsBookmark] = useState(false);

  const handleBoomark = (e) => {
    e.stopPropagation();
    setIsBookmark(!isBookmark);
  }

  return (
    // medicine-card 피그마에는 border-color: gray-100으로 설정되어 있지만 보이지 않아서 임시로 설정
    <div className={`flex p-5 border-gray-200 border rounded-lg h-[178px] items-center hover:cursor-pointer`} onClick={() => router.push('medicines/1')}>
      {/* medicine-image */}
      <div className={`w-[138px] h-[138px] bg-[#D9D9D9] rounded`}>
        {/* <img src='url' className={`w-[138px] h-[138px]`}>
        </img> */}
      </div>
      {/* info-wrapper */}
      <div className={`flex flex-col w-[203px] h-[124px] ml-4 gap-3`}>
        {/* tag */}
        <div className={`text-body2-r text-white bg-primary-200 w-16 h-6 rounded p-0.5 pb-[1px] text-center`}>
          진통/해열
        </div>
        <div className={`flex gap-6`}>
          <div className={`flex flex-col text-subhead1-sb gap-1 w-14`}>
            <p>제품명</p>
            <p>주요성분</p>
            <p>용도</p>
          </div>
          <div className={`flex flex-col text-body1-r gap-1`}>
            <p>TYLENOL</p>
            <p>아세트아미노펜</p>
            <p>해열, 진통, 소염제</p>
          </div>
        </div>
      </div>
      <div className={`flex-grow h-[100%] relative min-w-[30px]`}>
        {isBookmark ? (
          <BookmarkOnIcon className={`absolute top-0 right-0`} onClick={(e: React.MouseEvent) => handleBoomark(e)}/>
        ) : (
          <BookmarkIcon className={`absolute top-0 right-0`} onClick={(e: React.MouseEvent) => handleBoomark(e)}/>
        )}
      </div>
    </div>
  )
}

export default MedicineCard;