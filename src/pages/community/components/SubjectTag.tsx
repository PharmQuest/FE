import React from "react";

interface SubjectTagProps {
  text: string;
  variant?: "light" | "dark" | "light-big";
  className?: string;
}

const SubjectTag: React.FC<SubjectTagProps> = ({ text, variant = "light", className }) => {
  const bgColorClass =
    variant === "light" || variant === "light-big"
      ? "bg-primary-200"
      : "bg-primary-400";

  const textSizeClass =
    variant === "light-big" ? "lg:text-headline-b text-headline-b" : "lg:text-body2-r text-body2-r";

  const widthClass = variant === "light-big" ? "lg:w-[82px] w-[82px]" : "lg:w-16 w-16";

  return (
    <div
      className={`${widthClass} ${bgColorClass} ${textSizeClass} text-white rounded whitespace-nowrap flex justify-center items-center ${className}`}
    >
      {text}
    </div>
  );
};

export default SubjectTag;
