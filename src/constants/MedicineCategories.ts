export interface CategoryMapping {
  display: string;
  value: string;
}

// 상비약 카테고리
export const MEDICINE_CATEGORIES: CategoryMapping[] = [
  { display: "전체", value: "ALL" },
  { display: "진통/해열", value: "PAIN_RELIEF" },
  { display: "소화/위장", value: "DIGESTIVE" },
  { display: "감기/기침", value: "COLD" },
  { display: "알레르기", value: "ALLERGY" },
  { display: "상처/소독", value: "ANTISEPTIC" },
  { display: "멀미", value: "MOTION_SICKNESS" },
  { display: "안약", value: "EYE_DROPS" },
  { display: "기타", value: "OTHER" },
];

export const MEDICINE_COUNTRIES: CategoryMapping[] = [
  { display: "전체", value: "ALL" },
  { display: "미국", value: "미국" },
  { display: "한국", value: "한국" },
];

export const MEDICINE_FILTER_LIST = MEDICINE_CATEGORIES.map((cat) => ({
  text: cat.display,
  value: cat.value,
  url: `/medicines?category=${cat.value}`,
  isHomeButton: false,
}));

export const MOBILE_MEDICINE_FILTER_LIST = MEDICINE_CATEGORIES.map((cat) => ({
  text: cat.display,
  value: cat.value,
  url: `/medicines?category=${cat.value}`,
  isMobileButton: true,
}));
