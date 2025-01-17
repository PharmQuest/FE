import React from "react";

interface GrayButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const GrayButton: React.FC<GrayButtonProps> = ({
  text,
  onClick,
  className = "",
}) => {
  return (
    <input
      type="button"
      value={text}
      onClick={onClick}
      className={`px-3 py-1 text-center text-subhead2-sb text-gray-400 bg-gray-100 rounded cursor-pointer ${className}`}
    />
  );
};

export default GrayButton;
