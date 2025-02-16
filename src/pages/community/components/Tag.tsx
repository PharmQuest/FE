import React from "react";

interface TagProps {
  variant: "best" | "writer" | "bestBig"; // 태그 종류
  text?: string; // 태그 텍스트
  className?: string;
}

const Tag: React.FC<TagProps> = ({ variant, text, className }) => {
  const styles = {
    best: {
      container:
        "w-fit px-[6px] rounded-[1000px] border-2 border-solid border-point text-subhead3-sb text-point flex self-center",
      defaultText: "BEST",
    },
    bestBig: {
      container:
        "w-fit px-[6px] rounded-[1000px] border-2 border-solid border-point text-point flex self-center",
      defaultText: "BEST",
    },
    writer: {
      container:
        "w-fit px-2 rounded-[1000px] bg-primary-50 text-subhead3-sb text-gray-600 flex self-center",
      defaultText: "작성자",
    },
  };

  const style = styles[variant];

  if (!style) {
    console.error(`Invalid variant provided: ${variant}`);
    return null;
  }

  const { container, defaultText } = styles[variant];

  return <div className={`${className} ${container}`}>{text || defaultText}</div>;
};

export default Tag;
