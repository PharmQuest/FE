// 상비약 리스트

import FilterButton from "@/components/common/FilterButton";
import MedicineCard from "@/components/common/MedicineCard";

export default function Medicine() {
  return (
    
    <>
      {/* container */}
      <div className={`
        lg:w-[900px] lg:mx-auto
        md:w-[600px] md:mx-auto
        sm:w-full 
        min-h-[calc(100vh-412px)] w-full px-5`}>
        <div 
          className={`
            md:text-display2-b md:my-9
            text-m-subhead1-sb flex items-center gap-3 w-100% my-3`}>
          <h1 className={`min-w-fit`}>전체</h1>

          <div 
            className={`
              md:flex
              hidden h-fit content-center gap-2 overflow-y-scroll scrollbar-hide`}>
            <FilterButton text='전체' isSelected={true}/>
            <FilterButton text='진통/해열'/>
            <FilterButton text='소화/위장'/>
            <FilterButton text='감기/기침'/>
            <FilterButton text='알레르기'/>
            <FilterButton text='상처/소독'/>
            <FilterButton text='멀미'/>
            <FilterButton text='안약'/>
            <FilterButton text='기타'/>
          </div>
        </div>
        <div
          className={`
            md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] md:gap-4
            grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3`}>
          <MedicineCard/>
          <MedicineCard/>
          <MedicineCard/>
          <MedicineCard/>
          <MedicineCard/>
          <MedicineCard/>
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
