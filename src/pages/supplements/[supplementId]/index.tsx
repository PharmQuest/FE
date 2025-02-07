import React from "react";
import { useState, useEffect } from 'react'
import ProductBasicInfo from "../components/ProductBasicInfo";
import UsagePurpose from "../components/UsagePurpose";
import UsageInstructions from "../components/UsageInstructions";
import Warnings from "../components/Warning";
import MoreSupplements from "../components/MoreSupplements";
import { axiosInstance } from "@/apis/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation'
import axios from "axios";
import { useQueryClient } from '@tanstack/react-query';

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
    productCategory: string[];
    dosage: string[];
    purpose: string[];
    warning: string[];
    categories: string[];
    relatedSupplements: {
      id: number;
      name: string;
      country: string;
      productName: string;
      image: string;
      brand: string;
      maker: string;
      categories: string[];
      scrapCount: number;
      scrapped: boolean;
    }[];
    scrapped: boolean;
  };
  isSuccess: boolean;
}

interface ScrapResponse {
  code: string;
  message: string;
  result?: {
    supplementId: number;
    scrapCount: number;
    message: string;
    scrapped: boolean;
  };
  isSuccess: boolean;
}

const SupplementInfo: React.FC = () => {
  const queryClient = useQueryClient();
  const params = useParams()
  const id = params.supplementId
  console.log('현재 선택된 영양제 ID:', id);

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL이 복사되었습니다!");
    });
  };

  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: ["supplements", id],
    queryFn: async () => {
      const url = `/supplements/med?supplement_id=${id}`;

      console.log("Request URL:", url); // 실제 요청 URL 확인
      const response = await axiosInstance.get(url);
      console.log("detail API Response:", response.data); // 데이터
      return response.data;
    },
    enabled: !!id
  });

  if (isLoading)
    console.error("영양제 상세 로딩 중..");
  if (isError)
    console.error("상세Error=", error);

  // const [bookmarked, setBookmarked] = useState<boolean>(data?.result.scrapped || false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  useEffect(() => {
    if (data?.result.scrapped !== undefined) {
      setBookmarked(data.result.scrapped);
    }
  }, [data]);

  const getCountryDisplay = (country?: string) => {
    switch (country) {
      case "미국":
        return "미국 US";
      case "한국":
        return "한국 KR";
      default:
        return country || "-";
    }
  };

  const tableData = [
    {
      label: "제조사",
      value: data?.result.maker || "-"
    },
    {
      label: "브랜드",
      value: data?.result.brand || "-"
    },
    {
      label: "원산지",
      value: getCountryDisplay(data?.result.country)
    }
  ];

  const handleBookmarkToggle = async (id: number) => {
  // const handleBookmarkToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.stopPropagation();
    try {
      const response = await axiosInstance.patch<ScrapResponse>(`/supplements/${id}/scrap`);
      
      if (response.data.code === "AUTH4001") {
        alert("로그인이 필요한 서비스입니다.");
        return;
      }
      
      if (response.data.isSuccess) {
        setBookmarked(!bookmarked); // 상위 상태 업데이트

        console.log("상세 스크랩id=", id);
        console.log("상세 스크랩data=", response);
        
        // queryClient.invalidateQueries({ 
        //   queryKey: ['supplementsList']  // 리스트 조회의 쿼리 키
        // });
        // 모든 supplements 쿼리를 무효화
        queryClient.invalidateQueries({ 
          queryKey: ['supplementsList'],
          refetchType: 'all'  // 모든 쿼리를 다시 불러옴
        });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert("로그인이 필요한 서비스입니다.");
        return;
      }
      console.error("북마크 처리 중 오류 발생:", error);
    }
  };
    
  return (
    <>
    {data && (
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
          {/* 모바일 화면 북마크 */}
          <div className={`flex gap-4 items-center`}>
            <button onClick={() => handleBookmarkToggle} aria-label={bookmarked ? "북마크 해제" : "북마크 추가"}>
              <BookmarkIcon 
                            stroke={bookmarked ? "#FFD755" : "#707070"}
                            fill={bookmarked ? "#FFD755" : "none"}
                            className={`w-6 md:hidden`} />
            </button>
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
                id={data?.result.id}
                title={data?.result.productName || ""}
                tags={data?.result.categories || []}
                imageUrl={data?.result.image}
                tableData={tableData}
                // isBookmarked={data?.result.scrapped}
                isBookmarked={bookmarked}
                // onBookmarkClick={handleBookmarkClick}
                onBookmarkToggle={handleBookmarkToggle}
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
              <MoreSupplements supplements={data?.result.relatedSupplements.map(supp => ({
                id: supp.id,
                country: supp.country,
                title: supp.productName,
                tags: supp.categories,
                isBookmarked: supp.scrapped,
                src: supp.image
                })) || []}
                imageWidth={287}/>
                {/* <MoreSupplements supplements={data!.result.relatedSupplements} imageWidth={287} /> */}
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
};

export default SupplementInfo;
