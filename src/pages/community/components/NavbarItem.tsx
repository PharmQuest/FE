import React from "react";

interface NavbarItemProps {
  text: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ text }) => {
  return (
    <div className="flex flex-row w-full px-4 py-2 gap-2 text-subhead2-sb text-gray-400 border-solid border-t-[1px] cursor-pointer">
      <img src="./svgs/globe.svg" alt="glove" />
      {text}
    </div>
  );
};

export default NavbarItem;
