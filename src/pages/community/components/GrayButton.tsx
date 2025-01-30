import React from "react";

interface GrayButtonProps {
  text: string;
  onClick?: () => void;
  color?: "gray" | "green";
}

const GrayButton: React.FC<GrayButtonProps> = ({
  text,
  onClick,
  color = "gray",
}) => {

  const styles = {
    gray: "text-gray-400 bg-gray-100",
    green: "text-white bg-primary-300"
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

export default GrayButton;
