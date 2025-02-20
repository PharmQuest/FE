import { useState, useCallback } from "react";
import { useRouter } from "next/router";

export const useMedicineSearch = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [countryValue, setCountryValue] = useState("");

  const handleSearchSubmit = useCallback(() => {
    if (!searchText.trim() && countryValue === "") return;

    const searchParams = new URLSearchParams();

    if (searchText.trim()) {
      searchParams.append("keyword", searchText.trim());
    }

    if (countryValue && countryValue !== "ALL") {
      searchParams.append("country", countryValue);
    }

    searchParams.append("category", "ALL");
    searchParams.append("page", "1");

    router.push({
      pathname: "/medicines/search",
      query: searchParams.toString(),
    });
  }, [searchText, countryValue, router]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearchSubmit();
      }
    },
    [handleSearchSubmit]
  );

  return {
    searchText,
    setSearchText,
    countryValue,
    setCountryValue,
    handleSearchSubmit,
    handleKeyDown,
  };
};

export default useMedicineSearch;
