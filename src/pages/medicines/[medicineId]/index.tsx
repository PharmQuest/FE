// 상비약 상세 페이지

import { BookmarkIcon, ExternalIcon, LeftArrowIcon } from "@public/svgs";
import Image from "next/image";

function MedicineInfo() {
  return (
    <>
      {/* container */}
      <div
        className={`
          md:hidden
          text-m-headline1-b flex items-center justify-between text-gray-600 py-4 px-5 sticky top-0 bg-white shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)]`}>
        <div className={`flex gap-3`}>
          <LeftArrowIcon className={`w-[24px]`} />
          <p>
            제품 기본 정보
          </p>
        </div>
        <div className={`flex gap-4 items-center`}>
          <BookmarkIcon stroke={"#707070"} className={`w-6`} />
          <ExternalIcon className={`w-6 text-gray-400`} />
        </div>

      </div>
      <div
        className={`
        lg:w-[900px] lg:mx-auto
        md:w-[600px] md:mx-auto md:gap-[60px]
        sm:w-full 
        w-full px-5 flex flex-col gap-6`}>
        <div>
          <div 
            className={`
              md:flex 
              hidden mt-9 justify-between `}>
            <h1
              className={`text-display2-b text-gray-600`}>
              제품 기본 정보
            </h1>
            <div className={`flex items-end text-gray-400`}>
              <div className={`flex items-center gap-1`}>
                <ExternalIcon className={`w-6`}/>
                <div className={`text-subhead2-sb`}>
                  URL 복사
                </div>
              </div>
            </div>
          </div>
          <div
            className={`
            md:flex-row md:relative md:gap-5
            flex flex-col border border-gray-100 bg-white mt-5 rounded-xl p-4 gap-4`}>
            <div 
              className={`
                md:self-center
                border border-solid border-gray-200 rounded-lg overflow-hidden grow aspect-square`}>
              <Image
                className={`w-full`}
                src="/images/tylenol.png"
                alt="이미지"
                width={100}
                height={100} />
            </div>
            <div className={`flex flex-col gap-1 grow`}>
              <div
                className={`
                  md:text-body2-r
                  text-white bg-primary-200 px-2 pt-0.5 pb-[1px] w-fit rounded text-m-subhead2-sb`}>
                미국
              </div>
              <div className={`flex flex-col gap-5`}>
                <div
                  className={`
                    md:text-headline-b
                    text-gray-600 text-m-headline2-b`}>
                  상품명(브랜드이름) ex. 타이레놀
                </div>

                <div 
                  className={`
                    md:gap-2
                    flex flex-col gap-0.5 text-gray-400 text-subhead1-sb`}>
                  <div className={`flex gap-2`}>
                    <div
                      className={`
                        md:text-subhead1-sb md:min-w-[56px]
                        flex justify-between text-m-subhead1-sb min-w-[50px]`}>
                      <div>일</div><div>반</div><div>명</div>
                    </div>
                    <div className={`text-center`}>|</div>
                    <div>
                      아세트아미노펜
                    </div>
                  </div>


                  <div className={`flex gap-2`}>
                    <div
                      className={`
                        md:text-subhead1-sb md:min-w-[56px]
                        flex justify-between text-m-subhead1-sb min-w-[50px]`}>
                      <div>주</div><div>요</div><div>성</div><div>분</div>
                    </div>
                    <div className={`text-center`}>
                      |
                    </div>
                    <div>
                      acitveingredient ex. 제피아세트아미노펜 177.78mg
                    </div>
                  </div>

                  <div className={`flex gap-2`}>
                    <div
                      className={`
                        md:text-subhead1-sb md:min-w-[56px]
                        flex justify-between text-m-subhead1-sb min-w-[50px]`}>
                      <div>분</div><div>류</div>
                    </div>
                    <div className={`text-center`}>
                      |
                    </div>
                    <div>
                      진통/해열
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BookmarkIcon
              stroke={"#707070"}
              className={`
                md:absolute
                w-6 hidden right-6 top-6`} />
          </div>
        </div>

        <div className={`flex flex-col gap-2`}>
          <div 
            className={`
              md:text-gray-600 md:text-display2-b
              text-black text-m-headline2-b`}>사용 목적</div>
          <div 
            className={`
              md:text-body1-r
              text-m-body2-r px-3 py-5 bg-gray-50 border border-solid border-gray-100 rounded-lg flex flex-col gap-0.5`}>
            <div className={`flex gap-1`}>
              <span>•</span>
              <div>주 목적 : 감기로 인한 발열 및 동통(통증), 두통, 신경통, 근육통, 월결통, 염좌통(삔 통증)</div>
            </div>
            <div className={`flex gap-1`}>
              <span>•</span>
              <div>기타 : 치통, 관절통, 류마티양 동통(통증)</div>
            </div>
          </div>
        </div>

        <div className={`flex flex-col gap-2`}>
          <div 
            className={`
              md:text-gray-600 md:text-display2-b
              text-black text-m-headline2-b`}>복용법</div>
          <div 
            className={`
              md:text-body1-r
              text-m-body2-r px-3 py-5 bg-gray-50 border border-solid border-gray-100 rounded-lg flex flex-col gap-0.5`}>
            <div className={`flex gap-1`}>
              <span>•</span>
              <div>만 12세 이상 소아 및 성인</div>
            </div>
            <div className={`flex gap-1`}>
              <span>•</span>
              <div>1회 1~2정씩 1일 3~4회 (4~6시간 마다) 필요 시 복용한다.</div>
            </div>
            <div className={`flex gap-1`}>
              <span>•</span>
              <div>1일 최대 4그램(8정)을 초괗여 복용하지 않는다.</div>
            </div>
            <div className={`flex gap-1`}>
              <span>•</span>
              <div>이 약은 가능한 최단기간동안 최소 유효용량으로 복용한다.</div>
            </div>
          </div>
        </div>

        <div className={`flex flex-col gap-2`}>
          <div 
            className={`
              md:text-gray-600 md:text-display2-b
              text-black text-m-headline2-b`}>경고 및 주의사항</div>
          <div 
            className={`
              md:text-body1-r
              text-m-body2-r px-3 py-5 bg-gray-50 border border-solid border-gray-100 rounded-lg flex flex-col gap-0.5`}>
            <div className={`flex gap-1`}>
              <span>•</span>
              <div>경고사항</div>
            </div>
            <div className={`flex gap-1`}>
              <span>•</span>
              <div>경고사항 약마다 다르게 들어감</div>
            </div>
            <div className={`flex gap-1`}>
              <span>•</span>
              <div>그렇다고 함만</div>
            </div>
          </div>
        </div>
      </div>
      <div 
        className={`
          md:hidden
          flex flex-col justify-center items-center gap-7 mt-10 mx-5 px-[30.5px] text-center`}>
        <div className={`w-1.5 h-1.5 rounded-full bg-gray-200`} />
        <div className={`text-gray-300 text-m-caption2-r`}>본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로 하며,해당 정보는 의료 전문가의 조언을 대체 하지 않습니다.</div>
      </div>
    </>
  );
}

export default MedicineInfo;