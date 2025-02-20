import React from "react";
import { GetServerSideProps } from "next";
import MedicineSearchResults from "../components/MedicineSearchResults";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { keyword, category, country, page } = context.query;

  return {
    props: {
      initialKeyword: keyword || "",
      initialCategory: category || "ALL",
      initialCountry: country || "ALL",
      initialPage: page ? parseInt(page.toString()) : 1,
    },
  };
};

interface SearchPageProps {
  initialKeyword: string;
  initialCategory: string;
  initialCountry: string;
  initialPage: number;
}

const SearchPage: React.FC<SearchPageProps> = ({
  initialKeyword,
  initialCategory,
  initialCountry,
  initialPage,
}) => {
  return (
    <div className="bg-white min-h-screen">
      <MedicineSearchResults
        initialKeyword={initialKeyword}
        initialCategory={initialCategory}
        initialCountry={initialCountry}
        initialPage={initialPage}
      />
    </div>
  );
};

export default SearchPage;
