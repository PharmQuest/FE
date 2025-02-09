/* eslint-disable */

const Community = `/community/posts?category=`
const Medicine = `/medicines?category=`
const supplement = `/supplements?category=`

export const HOME_FILTER_LIST = [
  {
    text: "진통/해열",
    isHomeButton: true,
  },
  {
    text: "소화/위장",
    isHomeButton: true,
  },
  {
    text: "감기/기침",
    isHomeButton: true,
  },
  {
    text: "알레르기",
    isHomeButton: true,
  },
  {
    text: "상처/소독",
    isHomeButton: true,
  },
  {
    text: "멀미",
    isHomeButton: true,
  },
  {
    text: "안약",
    isHomeButton: true,
  },
  {
    text: "기타",
    isHomeButton: true,
  },
]

export const MOBILE_COMMUNIY_FILTER_LIST = [
  {
    text: "전체",
    isMobileButton: true,
    url: `${Community}ALL`,
    value: 'ALL',
  },
  {
    text: "자유",
    isMobileButton: true,
    url: `${Community}FORUM`,
    value: 'FORUM',
  },
  {
    text: "약국",
    isMobileButton: true,
    url: `${Community}PHARMACY`,
    value: 'PHARMACY',
  },
  {
    text: "병원",
    isMobileButton: true,
    url: `${Community}HOSPITAL`,
    value: 'HOSPITAL',
  },
  {
    text: "약",
    isMobileButton: true,
    url: `${Community}MEDICATION`,
    value: 'MEDICATION',
  },
  {
    text: "증상",
    isMobileButton: true,
    url: `${Community}SYMPTOM`,
    value: 'SYMPTOM',
  },
  {
    text: "영양제",
    isMobileButton: true,
    url: `${Community}SUPPLEMENT`,
    value: 'SUPPLEMENT',
  },
]

export const MOBILE_MEDICINE_FILTER_LIST = [
  {
    text: "전체",
    isMobileButton: true,
    url: `${Medicine}ALL`,
    value: `ALL`,
  },
  {
    text: "진통/해열",
    isMobileButton: true,
    url: `${Medicine}PAIN_RELIEF`,
    value: `PAIN_RELIEF`,
  },
  {
    text: "소화/위장",
    isMobileButton: true,
    url: `${Medicine}DIGESTIVE`,
    value: `DIGESTIVE`,
  },
  {
    text: "감기/기침",
    isMobileButton: true,
    url: `${Medicine}COLD`,
    value: `COLD`,
  },
  {
    text: "알레르기",
    isMobileButton: true,
    url: `${Medicine}ALLERGY`,
    value: `ALLERGY`,
  },
  {
    text: "상처/소독",
    isMobileButton: true,
    url: `${Medicine}ANTISEPTIC`,
    value: `ANTISEPTIC`,
  },
  {
    text: "멀미",
    isMobileButton: true,
    url: `${Medicine}MOTION_SICKNESS`,
    value: `MOTION_SICKNESS`,
  },
  {
    text: "안약",
    isMobileButton: true,
    url: `${Medicine}EYE_DROPS`,
    value: `EYE_DROPS`,
  },
  {
    text: "기타",
    isMobileButton: true,
    url: `${Medicine}OTHER`,
    value: `OTHER`,
  },
]

export const MOBILE_SUPPLEMENT_FILTER_LIST = [
  {
    text: "전체",
    isMobileButton: true,
    url: `${supplement}전체`,
    value: "전체",
  },
  {
    text: "면역력 강화",
    isMobileButton: true,
    url: `${supplement}면역`,
    value: "면역",
  },
  {
    text: "피로회복",
    isMobileButton: true,
    url: `${supplement}피로`,
    value: "피로",
  },
  {
    text: "소화건강",
    isMobileButton: true,
    url: `${supplement}소화`,
    value: "소화",
  },
  {
    text: "피부건강",
    isMobileButton: true,
    url: `${supplement}피부`,
    value: "피부",
  },
  {
    text: "뼈관절건강",
    isMobileButton: true,
    url: `${supplement}관절`,
    value: "관절",
  },
  {
    text: "눈건강",
    isMobileButton: true,
    url: `${supplement}눈건강`,
    value: "눈건강",
  },
]