import React from "react";

interface TextButtonProps {
  text: string;
  onClick?: () => void;
  color?: "gray" | "green" | "white";
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  onClick,
  color = "gray",
}) => {
  const styles = {
    gray: "text-gray-400 bg-gray-100",
    green: "text-white bg-primary-300",
    white: "text-gray-400 bg-white border border-gray-100",
  };

  return (
    <input
      type="button"
      value={text}
      onClick={onClick}
      className={`px-3 py-1 text-center text-subhead2-sb rounded cursor-pointer ${styles[color]}`}
    />
  );
};

export default TextButton;
