import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axios-instance";
import Image from "next/image";
import { BookmarkIcon, ExternalIcon, LeftArrowIcon } from "@public/svgs";
import { useRouter } from "next/router";
import InfoRow from "./InfoRow";
import Section from "./Section";
import useModalStore from "@/store/useModalStore";
import { useMedicineScrap } from "@/hooks/medicine/useMedicineScrap";

interface MedicineDetailResponse {
  code: string;
  message: string;
  result: {
    brandName: string;
    genericName: string;
    substanceName: string;
    activeIngredient: string;
    purpose: string;
    indicationsAndUsage: string;
    dosageAndAdministration: string;
    splSetId: string;
    imgUrl: string;
    category: string;
    country: string;
    warnings: string;
    scrapped: boolean;
  };
  isSuccess: boolean;
}

const formatText = (text: string): string[] => {
  if (!text) return [];
  const sentences = text.split(".").filter(Boolean);
  return sentences.map((sentence) => `${sentence.trim()}.`);
};

const MedicineDetail = ({ medicineId }: { medicineId: string }) => {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState("/images/no_image.webp");
  const { setNoticeModalText, setIsNoticeModalOpen } = useModalStore();

  const { data, isLoading, isError } = useQuery<MedicineDetailResponse>({
    queryKey: ["medicine", medicineId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/medicine/detail?medicineId=${medicineId}`
      );
      return response.data;
    },
    staleTime: 0,
  });

  const { isScraped, toggleScrap } = useMedicineScrap(
    parseInt(medicineId, 10),
    data?.result?.scrapped ?? false
  );

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setNoticeModalText("URL이 복사되었습니다. 원하는 곳에 붙여 넣으세요.");
    setIsNoticeModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">데이터를 불러오는데 실패했습니다.</div>
      </div>
    );
  }

  const result = data?.result;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full">
      {/* Mobile Header */}
      <div className="md:hidden text-m-headline1-b flex items-center justify-between text-gray-600 py-4 px-5 sticky top-0 bg-white shadow-custom-light">
        <div className="flex gap-3 items-center">
          <LeftArrowIcon className="w-6 cursor-pointer" onClick={handleBack} />
          <h1>제품 기본 정보</h1>
        </div>
        <div className="flex gap-4">
          <BookmarkIcon
            className="w-6 cursor-pointer"
            stroke={isScraped ? "#FFD755" : "#707070"}
            fill={isScraped ? "#FFD755" : "none"}
            onClick={toggleScrap}
          />
          <ExternalIcon
            className="w-6 text-gray-400 cursor-pointer"
            onClick={copyLink}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:w-[900px] lg:mx-auto md:w-[600px] md:mx-auto w-[calc(100%-40px)] mx-5">
        {/* Header */}
        <div className="hidden md:flex md:justify-between md:items-center md:mt-9">
          <h1 className="lg:text-display2-b text-m-headline1-b text-gray-600">
            제품 기본 정보
          </h1>
          <div
            className="flex items-center gap-2 text-gray-400 cursor-pointer"
            onClick={copyLink}
          >
            <ExternalIcon className="w-6" />
            <p className="text-subhead1-sb">URL 복사</p>
          </div>
        </div>

        {/* Product Info Card */}
        <div className="lg:p-6 md:flex-row border border-gray-100 rounded-xl mt-5 p-4 flex flex-col md:gap-4 gap-1">
          <div className="lg:w-[200px] lg:h-[200px] max-md:h-[200px] border border-gray-200 rounded-lg overflow-hidden">
            <Image
              src={result?.imgUrl || imgSrc}
              alt={result?.brandName || ""}
              width={200}
              height={200}
              className="w-full h-full object-contain"
              onError={() => setImgSrc("/images/no_image.webp")}
            />
          </div>

          <div className="flex flex-col gap-2 grow">
            <p
              className={`text-body2-r text-white bg-primary-200 w-fit rounded px-2 pt-0.5 pb-[1px] text-center mt-4`}
            >
              {result?.country}
            </p>

            <p className="text-gray-600 lg:text-headline-b text-m-headline2-b">
              {result?.brandName}
            </p>
            <div className="flex flex-col md:gap-2 text-gray-400 md:mt-8">
              <InfoRow label="일반명" value={result?.genericName || ""} />
              <InfoRow
                label="주요성분"
                value={result?.activeIngredient || ""}
              />
              <InfoRow label="분류" value={result?.category || ""} />
            </div>
          </div>

          {/* Desktop Bookmark */}
          <BookmarkIcon
            className="hidden md:block w-7 cursor-pointer self-start"
            stroke={isScraped ? "#FFD755" : "#707070"}
            fill={isScraped ? "#FFD755" : "none"}
            onClick={toggleScrap}
          />
        </div>

        <Section title="사용 목적">
          <ul className="list-disc pl-5 space-y-2">
            {formatText(result?.purpose || "").map((sentence, index) => (
              <li key={index} className="lg:text-body1-r text-m-body2-r">
                {sentence}
              </li>
            ))}
            {formatText(result?.indicationsAndUsage || "").map(
              (sentence, index) => (
                <li
                  key={`usage-${index}`}
                  className="lg:text-body1-r text-m-body2-r"
                >
                  {sentence}
                </li>
              )
            )}
          </ul>
        </Section>

        <Section title="복용법">
          <ul className="list-disc pl-5 space-y-2">
            {formatText(result?.dosageAndAdministration || "").map(
              (sentence, index) => (
                <li key={index} className="lg:text-body1-r text-m-body2-r">
                  {sentence}
                </li>
              )
            )}
          </ul>
        </Section>

        <Section title="경고 및 주의사항">
          <ul className="list-disc pl-5 space-y-2">
            {formatText(result?.warnings || "").map((sentence, index) => (
              <li key={index} className="lg:text-body1-r text-m-body2-r">
                {sentence}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
};

export default MedicineDetail;
