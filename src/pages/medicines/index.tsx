// 상비약 리스트

import MedicineCard from "@/components/common/MedicineCard";
import MedicineHeader from "@/components/medicines/MedicineHeader";
import Header from "@/components/layout/Header";

export default function Medicine() {
  return (
    
    <>
      <MedicineHeader/>
      {/* container */}
      <div className={`pl-[260px] pr-[260px]`}>
        <div className={`mt-9 mb-9 text-display2-b flex items-center gap-3`}>
          <h1>전체 3912개</h1>


          {/* 컴포넌트로 대체할 부분 */}
          <div className={`flex h-7 content-center gap-2`}>
            <button className={`text-subhead1-sb text-center text-white bg-point p-3 pt-0.5 pb-0.5 rounded-full`}>
              전체
            </button>
            <button className={`text-subhead1-sb text-center border border-gray-300 border-solid text-gray-300 p-3 pt-0.5 pb-0.5 rounded-full`}>
              진통/해열
            </button>
            <button className={`text-subhead1-sb text-center border border-gray-300 border-solid text-gray-300 p-3 pt-0.5 pb-0.5 rounded-full`}>
              소화/위장
            </button>
          </div>


        </div>
        <div className={`grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-4`}>
          <MedicineCard/>
          <MedicineCard/>
          <MedicineCard/>
          <MedicineCard/>
        </div>
        <div>

        </div>
      </div>
    </>
  );
}

// Medicine.getLayout = function getLayout(page) {
//   return (
//     <>
//     <MedicineHeader>
//       <Header/>
//     </MedicineHeader>
//     {page}
//     </>
//   )
// }
