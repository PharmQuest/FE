// 상비약 상세 페이지

import Image from "next/image";

function MedicineInfo() {
  return (
    <>
    {/* container */}
    <div className={`pl-[260px] pr-[260px] flex flex-col`}>
      <h1 className={`text-display2-b text-gray-600 mt-9 mb-4`}>
        제품 기본 정보
      </h1>

      <div className={`flex border border-gray-200`}>
        {/* 약 사진 */}
        <div className={`border-r`}>
          <Image 
            src="/images/tylenol.png"
            alt="이미지"
            width={250}
            height={250}/>
        </div>
        <div className="grid grid-cols-[1fr,3fr] text-center flex-grow">
          <div className={`content-center border-b border-r`}>제품명</div>
          <div className={`content-center border-b`}>타이레놀정500mg</div>

          <div className={`content-center border-b border-r`}>성분 및 함량</div>
          <div className={`content-center border-b`}>아세트아미노펜 500mg (Acetaminophen 500mg)</div>

          <div className={`content-center border-b border-r`}>제형</div>
          <div className={`content-center border-b`}>흰색의 장방형 필름코팅정제</div>

          <div className={`content-center border-r`}>분류</div>
          <div className={`content-center`}>해열 / 진통 / 소염제 / 기타 진통제</div>
        </div>
      </div>

      <div className={`grid grid-cols-[1fr,5.5fr]`}>
        <div className={`text-center content-center p-9 border-b border-r border-l`}>사용 목적</div>
        <div className={`content-center border-b border-r p-5`}>
          주 목적 : 감기로 인한 발열 및 동통(통증), 두통, 신경통, 근육통, 월결통, 염좌통(삔 통증)<br />
          기타 : 치통, 관절통, 류마티양 동통(통증)</div>

        <div className={`text-center content-center p-9 border-b border-r border-l`}>용법용량</div>
        <div className={`content-center border-b border-r p-5`}>
          만 12세 이상 소아 및 성인<br />
          1회 1~2정씩 1일 3-4회 (4-6시간 마다) 필요 시 복용한다.<br />
          1일 최대 4그램 (8정)을 초과하여 복용하지 않는다.<br />
          이 약은 가능한 최단기간동안 최소 유효용량으로 복용한다.<br />
        </div>

        <div className={`text-center content-center p-9 border-b border-r border-l`}>경고 및 주의사항</div>
        <div className={`content-center border-b border-r p-5`}>
          본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로 하며, 제공되는 정보는 의료 전문가의 조언을 대체 하지 않습니다.
        </div>
      </div>


    </div>
    </>
  );
}

export default MedicineInfo;