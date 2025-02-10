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
  };

  const unformatCategory = (category: string) => {
    switch (category) {
      case "FORUM":
        return "자유";

      case "PHARMACY":
        return "약국";

      case "HOSPITAL":
        return "병원";

      case "MEDICATION":
        return "약";

      case "SYMPTOM":
        return "증상";

      case "SUPPLEMENT":
        return "영양제";

      default:
        return category;
    }
  };

  return { formatCategory, unformatCategory};
};

export default useFormatCategory;
