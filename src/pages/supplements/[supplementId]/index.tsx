import React from "react";
import ProductBasicInfo from "../components/ProductBasicInfo";
import UsagePurpose from "../components/UsagePurpose";
import UsageInstructions from "../components/UsageInstructions";
import Warnings from "../components/Warning";
import MoreSupplements from "../components/MoreSupplements";
import { axiosInstance } from "@/apis/axios-instance";
import { useQuery } from "@tanstack/react-query";

import {
  productBasicInfo,
  usagePurpose,
  usageInstructions,
  warnings,
  supplements,
} from "@/mocks/supplements";
import { BookmarkIcon, ExternalIcon, LeftArrowIcon } from "@public/svgs";
import router from "next/router";

interface ApiResponse {
  code: string;
  message: string;
  result: {
    id: number;
    name: string;
    country: string;
    productName: string;
    image: string;
    brand: string;
    maker: string;
    scrapCount: number;
    category1: string;
    category2: string;
    category3: string;
    category4: string;
    dosage: string;
    purpose: string;
    warning: string;
    categories: string[];
    relatedSupplements: {
      id: number;
      name: string;
      country: string;
      productName: string;
      image: string;
      brand: string;
      maker: string;
      scrapCount: number;
      scrapped: boolean;
    }[];
    scrapped: boolean;
  };
  isSuccess: boolean;
}

const SupplementInfo: React.FC = () => {
  const id = router.query.id;
  console.log('현재 선택된 영양제 ID:', id);

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL이 복사되었습니다!");
    });
  };

  const { data } = useQuery<ApiResponse>({
    queryKey: ["supplements", id],
    queryFn: async () => {
      const url = `/supplements/med?supplement_id=${id}`;

      console.log("Request URL:", url); // 실제 요청 URL 확인
      const response = await axiosInstance.get(url);
      console.log("detail API Response:", response.data); // 데이터
      return response.data;
    }
  });

  return (
    <>
    <div
        className={`
          xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto
          md:shadow-none
          text-m-headline1-b flex items-center justify-between text-gray-600 py-5 top-0 bg-white shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)]`}>
        <div className={`flex gap-3 sm:px-4`} onClick={() => router.back()}>
          <LeftArrowIcon className={`w-[24px] lg:hidden sm:pl-[-20px]`} />
          <p className="lg:text-display2-b">
            제품 기본 정보
          </p>
        </div>
        <div className={`flex gap-4 items-center`}>
          <BookmarkIcon stroke={"#707070"} className={`w-6 md:hidden`} />
          <div onClick={copyToClipboard}>
            <ExternalIcon className={`w-6 text-gray-400 mr-4 md:p-0`}/>            
          </div>
        </div>
      </div>
    <div className="relative xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto w-[calc(100%-40px)] mx-5 py-8">
      <div className="flex flex-col gap-10">
        <div className="relative">
          {/* 제품 정보 컴포넌트 */}
          <ProductBasicInfo
            title={data.result.productName}
            tags={productBasicInfo.tags || []}
            // imageUrl={data?.result.image}
            tableData={productBasicInfo.tableData}
          />
        </div>

        {/* 사용 목적 */}
        <div>
          <h2 className="text-display2-b text-gray-600 mb-4">사용 목적</h2>
          <UsagePurpose content={data?.result.purpose} />
        </div>

        {/* 복용법 */}
        <div>
          <h2 className="text-display2-b text-gray-600 mb-4">복용법</h2>
          <UsageInstructions instructions={data?.result.dosage} />
        </div>

        {/* 경고 및 주의사항 */}
        <div>
          <h2 className="text-display2-b text-gray-600 mb-4">경고 및 주의사항</h2>
          <Warnings warnings={data?.result.warning} />
        </div>

        {/* 영양제 더보기 */}
        <div className="hidden lg:block">
          <MoreSupplements supplements={data?.result.relatedSupplements} imageWidth={287} />
        </div>
      </div>
    </div>
    </>
  );
};

export default SupplementInfo;
