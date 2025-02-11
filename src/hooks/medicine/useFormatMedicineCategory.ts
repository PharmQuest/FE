const useFormatCategory = () => {
  const formatCategory = (category: string) => {
    switch (category) {
      case "진통/해열":
        return "PAIN_RELIEF";
      case "소화/위장":
        return "DIGESTIVE";
      case "감기/기침":
        return "COLD";
      case "알레르기":
        return "ALLERGY";
      case "상처/소독":
        return "ANTISEPTIC";
      case "멀미":
        return "MOTION_SICKNESS";
      case "안약":
        return "EYE_DROPS";
      case "기타":
        return "OTHER";
      case "전체":
        return "ALL";
      default:
        return "ALL";
    }
  };

  return formatCategory;
};

export default useFormatCategory;
