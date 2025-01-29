import { DropdownArrowIcon } from "@public/svgs";
import { useEffect, useState } from "react";

type DropdownInfo = {
  key: string;      // ex) FORUM, PHARMACY / KOREA, JAPAN
  value: string;    // ex) 자유, 약국 / 한국, 일본
};

type DropdownProps = {
  info: DropdownInfo[];
  initialText: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown: React.FC<DropdownProps> = ({info, initialText, value, setValue}) => {

  const [dropdownText, setDropdownText] = useState(initialText);
  const [isOpen, setIsOpen] = useState(false);

  const showDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  }

  const selectContent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // 카테고리 드롭다운 text 설정
    setDropdownText(e.currentTarget.innerText);

    // 카테고리 Value 값 설정
    const value = e.currentTarget.dataset.value
    if (value) {
      setValue(value);
    }
    setIsOpen(false);
  }

  // 바깥 클릭 시 dropdown close
  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false);
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }

  }, []);

  useEffect(() => {
    setDropdownText(initialText)
  }, [initialText])

  return (
    <div className={`flex rounded-[4px] border border-gray-100 text-gray-600 text-subhead1-sb outline-0 grow`}>
      <div
        className={`flex justify-between content-center h-full relative px-6 py-3 grow select-none`}
        onClick={showDropdown}>
        {dropdownText}
        <DropdownArrowIcon className={`self-center`} />
        <div
          className={`px-6 py-5 w-full top-14 left-0 absolute flex-col gap-4 bg-white rounded-[4px] shadow-custom-light select-none z-20 ${isOpen ? `flex` : `hidden`}`}>
          {/* 선택 항목이 잘 안보여서 임의로 hover 시 bg-color 설정 */}

          {info?.map((item, index) => (
            <div 
              key={index}
              data-value={item.key}
              onClick={selectContent}
              className={`hover:bg-gray-100 ${value === item.key && `text-secondary-500`}`}>
              {item.value}
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}


export default Dropdown;