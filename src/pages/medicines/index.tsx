// 상비약 리스트

import FilterButton from "@/components/common/FilterButton";
import MedicineCard from "@/components/common/MedicineCard";

export default function Medicine() {
  return (
    
    <>
      {/* container */}
      <div className={`pl-[260px] pr-[260px] min-h-[calc(100vh-412px)]`}>
        <div className={`mt-9 mb-9 text-display2-b flex items-center gap-3`}>
          <h1>전체 3912개</h1>


          {/* 컴포넌트로 대체할 부분 */}
          <div className={`flex h-7 content-center gap-2`}>
            <FilterButton text='전체'/>
            <FilterButton text='진통/해열'/>
            <FilterButton text='소화/위장'/>
          </div>


        </div>
        <div className={`grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-4`}>
          <MedicineCard/>
          <MedicineCard/>
          <MedicineCard/>
          <MedicineCard/>
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
