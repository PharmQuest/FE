const useFormatCategory = () => {
  const formatCategory = (category: string) => {
    switch (category) {
      case "자유":
        return "FORUM";
  
      case "약국":
        return "PHARMACY";
  
      case "병원":
        return "HOSPITAL";
  
      case "약":
        return "MEDICATION";
  
      case "증상":
        return "SYMPTOM";
  
      case "영양제":
        return "SUPPLEMENT";
  
      default:
        return "ALL";
    }
  }

  return formatCategory;
};

export default useFormatCategory;