import React from "react";

interface NavbarItemProps {
  text: string;
  onClick?: () => void;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ text, onClick }) => {
  return (
    <div
      className="flex flex-row w-full px-5 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default NavbarItem;
