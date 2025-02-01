import React from "react";
import ProductBasicInfo from "../components/ProductBasicInfo";
import UsagePurpose from "../components/UsagePurpose";
import UsageInstructions from "../components/UsageInstructions";
import Warnings from "../components/Warning";
import MoreSupplements from "../components/MoreSupplements";

import {
  productBasicInfo,
  usagePurpose,
  usageInstructions,
  warnings,
  supplements,
} from "@/mocks/supplements";
import { ExternalIcon, LeftArrow } from "@public/svgs";
import Link from "next/link";

const SupplementInfo: React.FC = () => {
  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL이 복사되었습니다!");
    });
  };

  return (
    <div className="relative w-full h-full bg-white px-4 py-10">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-10">
        <div className="relative">
          <div className="w-full max-w-[1000px] px-4 md:px-0 py-4 flex justify-between items-center md:shadow-none shadow-[0px_2px_0px_0px_rgba(0,0,0,0.05)] mb-4">
            <div className="flex items-center gap-2">
              <Link href="/mypage">
                <LeftArrow className="w-6 h-6 text-gray-600 sm:block lg:hidden" />
              </Link>
              <h2 className="text-display2-b text-gray-600">제품 기본 정보</h2>
            </div>

            {/* URL 복사 버튼 */}
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-gray-500 text-sm hover:text-gray-700"
            >
              <ExternalIcon />
              <span>URL 복사</span>
            </button>
          </div>

          {/* 제품 정보 컴포넌트 */}
          <ProductBasicInfo
            title={productBasicInfo.title}
            tags={productBasicInfo.tags || []}
            // imageUrl={productBasicInfo.imageUrl}
            tableData={productBasicInfo.tableData}
          />
        </div>

        {/* 사용 목적 */}
        <div>
          <h2 className="text-display2-b text-gray-600 mb-4">사용 목적</h2>
          <UsagePurpose content={usagePurpose} />
        </div>

        {/* 복용법 */}
        <div>
          <h2 className="text-display2-b text-gray-600 mb-4">복용법</h2>
          <UsageInstructions instructions={usageInstructions} />
        </div>

        {/* 경고 및 주의사항 */}
        <div>
          <h2 className="text-display2-b text-gray-600 mb-4">경고 및 주의사항</h2>
          <Warnings warnings={warnings} />
        </div>

        {/* 영양제 더보기 */}
        <div className="hidden lg:block">
          <MoreSupplements supplements={supplements} imageWidth={287} />
        </div>
      </div>
    </div>
  );
};

export default SupplementInfo;
