import React from "react";
import { useState, useEffect } from 'react'
import ProductBasicInfo from "../components/ProductBasicInfo";
import UsagePurpose from "../components/UsagePurpose";
import UsageInstructions from "../components/UsageInstructions";
import Warnings from "../components/Warning";
import MoreSupplements from "../components/MoreSupplements";
import { axiosInstance } from "@/apis/axios-instance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from '@tanstack/react-query';
import useModalStore from "@/store/useModalStore";

import { BookmarkIcon, ExternalIcon, LeftArrowIcon } from "@public/svgs";
import { useRouter } from "next/router";

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
      selectCategories: string[];
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
    selectCategories: string[];
    scrapped: boolean;
  };
  isSuccess: boolean;
}

const SupplementInfo: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter()
  const {supplementId} = router.query
  const id = Number(supplementId)
  console.log('현재 선택된 영양제 ID:', id);

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setNoticeModalText("URL이 복사되었습니다. 원하는 곳에 붙여 넣으세요.");
      setIsNoticeModalOpen(true);
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
    console.warn("영양제 상세 로딩 중..");
  if (isError)
    console.error("상세Error=", error);

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

  const { setIsNoticeModalOpen, setNoticeModalText } = useModalStore();

  const handleBookmarkToggle = async (id: number) => {
 
    try {      
      // 모든 supplements 쿼리를 무효화
      queryClient.invalidateQueries({ 
        queryKey: ['supplementsList'],
        refetchType: 'all'  // 모든 쿼리를 다시 불러옴
      });

      const response = await axiosInstance.patch<ScrapResponse>(`/supplements/${id}/scrap`);
      
      if (response.data.code === "AUTH4001") {
        setNoticeModalText("로그인이 필요한 서비스입니다.");
        setIsNoticeModalOpen(true);
        router.push("/login");
        return;
      }
      
      if (response.data.isSuccess === true) {
        setBookmarked(!bookmarked); // 상위 상태 업데이트
        setNoticeModalText(
          bookmarked ? "스크랩이 해제되었습니다." : "스크랩이 완료되었습니다."
        );
        setIsNoticeModalOpen(true);

        console.log("상세 스크랩id=", id);
        console.log("상세 스크랩data=", response);
     
      } else {
        setNoticeModalText(response.data.message);
        setIsNoticeModalOpen(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setNoticeModalText("로그인이 필요한 서비스입니다.");
        setIsNoticeModalOpen(true);
        router.push("/login");
        return;
      }
      setNoticeModalText("스크랩 처리 중 오류가 발생했습니다.");
      setIsNoticeModalOpen(true);
    }
  };
    
  return (
    <>
    {data && (
      <>
        <div className="md:hidden text-m-headline1-b flex items-center justify-between text-gray-600 py-4 px-5 top-0 bg-white shadow-md">
          <div className="flex gap-3 items-center">
            <LeftArrowIcon className="w-6 cursor-pointer" onClick={() => router.back()} />
            <h1>제품 기본 정보</h1>
          </div>
          <div className="flex gap-4">
            <BookmarkIcon 
              className="w-6 cursor-pointer"  
              stroke={bookmarked ? "#FFD755" : "#707070"}
              fill={bookmarked ? "#FFD755" : "none"}
              onClick={() => handleBookmarkToggle(id)}
            />
            <ExternalIcon className="w-6 text-gray-400 cursor-pointer" onClick={copyToClipboard} />
          </div>
        </div>

        <div className="hidden md:flex md:justify-between md:items-center md:mt-9 lg:w-[900px] lg:mx-auto md:w-[600px] md:mx-auto">
          <h1 className="lg:text-display2-b text-headline-b text-gray-500">제품 기본 정보</h1>
          <div className="flex items-center gap-2 text-gray-400 cursor-pointer" onClick={copyToClipboard}>
            <ExternalIcon className="w-6" />
            <p className="text-subhead2-sb">URL 복사</p>
          </div>
        </div>
        <div className="relative xl:w-[900px] xl:mx-auto lg:w-[900px] lg:mx-[50px] md:w-[601px] md:mx-auto w-[calc(100%-40px)] mx-5">
          <div className="flex flex-col">
            <div className="relative">
              {/* 제품 정보 컴포넌트 */}
              <ProductBasicInfo
                id={data?.result.id}
                title={data?.result.productName || ""}
                tags={data?.result.categories || []}
                imageUrl={data?.result.image}
                tableData={tableData}
                isBookmarked={bookmarked}
                onBookmarkToggle={handleBookmarkToggle}
              />
            </div>

            {/* 사용 목적 */}
            <div className="md:mt-[60px] mt-6">
              <h2 className="lg:text-gray-600 lg:text-display2-b text-black text-m-headline2-b mb-4">사용 목적</h2>
              <UsagePurpose content={data?.result.purpose} />
            </div>

            {/* 복용법 */}
            <div className="md:mt-[60px] mt-6">
            <h2 className="lg:text-gray-600 lg:text-display2-b text-black text-m-headline2-b mb-4">복용법</h2>
              <UsageInstructions instructions={data?.result.dosage} />
            </div>

            {/* 경고 및 주의사항 */}
            <div className="md:mt-[60px] mt-6">
            <h2 className="lg:text-gray-600 lg:text-display2-b text-black text-m-headline2-b mb-4">경고 및 주의사항</h2>
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
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
};

export default SupplementInfo;
