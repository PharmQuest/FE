import React from "react";

interface SubjectTagProps {
  text: string;
  variant?: "light" | "dark" | "light-big";
}

const SubjectTag: React.FC<SubjectTagProps> = ({ text, variant = "light" }) => {
  const bgColorClass =
    variant === "light" || variant === "light-big"
      ? "bg-primary-200"
      : "bg-primary-400";

  const textSizeClass =
    variant === "light-big" ? "text-headline-b" : "text-body2-r";

  const widthClass = variant === "light-big" ? "w-[82px]" : "w-16";

  return (
    <div
      className={`${widthClass} ${bgColorClass} ${textSizeClass} max-h-[33px] text-white rounded whitespace-nowrap flex justify-center items-center`}
    >
      {text}
    </div>
  );
};

export default SubjectTag;
