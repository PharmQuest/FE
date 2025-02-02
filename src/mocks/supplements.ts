export interface TableData {
    label: string;
    value: string;
  }
  
  export interface Supplement {
    id: string;
    country: string;
    title: string;
    tags: string[];
    isBookmarked?: boolean;
  }
  
  export const productBasicInfo = {
    title: "[미국] 나우푸드 로우 마카 750mg 배지 캡슐",
    imageUrl: "",
    tableData: [
      { label: "브랜드", value: "Now Foods" },
      { label: "제조사", value: "Now Foods" },
      { label: "원산지", value: "미국 US" },
    ],
    tags: ["에너지 증진", "호르몬 건강"], // 추가된 tags
  };
  
  export const usagePurpose: string[] = [
    "주 목적 : 감기로 인한 발열 및 동통(통증), 두통, 신경통, 근육통, 월경통, 염좌통(삔 통증)",
    "기타 : 치통, 관절통, 류마티양 동통(통증)",
  ]; 
  export const usageInstructions: string[] = [
    "만 12세 이상 소아 및 성인",
    "1회 1~2정씩 1일 3-4회 (4-6시간 마다) 필요 시 복용한다.",
    "1일 최대 4그램 (8정)을 초과하여 복용하지 않는다.",
    "이 약은 가능한 최단기간동안 최소 유효용량으로 복용한다.",
  ];
  
  export const warnings: string[] = [
    "경고사항",
    "경고사항 약마다 다르게 들어감",
    "그렇다고 함",
  ];
  
  export const supplements: Supplement[] = [
    {
      id: "1",
      country: "미국",
      title: "네이처메이드 멀티비타민",
      tags: ["면역력강화", "국민비타민"],
      isBookmarked: false,
    },
    {
      id: "2",
      country: "미국",
      title: "오메가3",
      tags: ["눈건강", "혈관건강"],
      isBookmarked: true,
    },
    {
      id: "3",
      country: "캐나다",
      title: "비타민C",
      tags: ["피부건강", "항산화"],
      isBookmarked: false,
    },
  ];

  export const mockMedicines = [
    {
      id: "1",
      country: "미국",
      title: "네이처메이드 멀티비타민",
      tags: ["면역력강화", "피부건강"],
      isBookmarked: true,
    },
    {
      id: "2",
      country: "한국",
      title: "정관장 홍삼정",
      tags: ["소화건강", "피로회복"],
      isBookmarked: false,
    },
    {
      id: "3",
      country: "독일",
      title: "센트룸 실버",
      tags: ["눈건강", "멀티비타민"],
      isBookmarked: true,
    },
    {
      id: "4",
      country: "미국",
      title: "옵티멈 뉴트리션 단백질",
      tags: ["운동 보충제", "근육 강화"],
      isBookmarked: false,
    },
    {
      id: "5",
      country: "캐나다",
      title: "네추럴 팩터스 비타민C",
      tags: ["면역력강화", "감기 예방"],
      isBookmarked: true,
    },
    {
      id: "6",
      country: "프랑스",
      title: "오쏘몰 이뮨",
      tags: ["피로회복", "체력 강화"],
      isBookmarked: false,
    },
    {
      id: "7",
      country: "일본",
      title: "DHC 비타민D",
      tags: ["뼈 건강", "칼슘 흡수"],
      isBookmarked: true,
    },
    {
      id: "8",
      country: "한국",
      title: "뉴트리원 루테인",
      tags: ["눈건강", "블루라이트 차단"],
      isBookmarked: false,
    },
    {
      id: "9",
      country: "호주",
      title: "블랙모어스 오메가3",
      tags: ["혈액순환", "두뇌 건강"],
      isBookmarked: true,
    },
    {
      id: "10",
      country: "미국",
      title: "칼슘 마그네슘 비타민D",
      tags: ["뼈 건강", "골다공증 예방"],
      isBookmarked: false,
    },
  ];
  
  