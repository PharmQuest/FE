// 커뮤니티_게시글 작성

import { CameraIcon, DropdownArrowIcon, XIcon } from "@public/svgs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CreatePost() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [categoryValue, setCategoryValue] = useState("");
  const [categoryText, setCategoryText] = useState("주제 선택");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [countryValue, setCountryValue] = useState("NONE");
  const [countryText, setCountryText] = useState("위치 추가");
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const [uploadImage, setUploadImage] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          setUploadImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  const showCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsCategoryOpen(!isCategoryOpen);
    setIsCountryOpen(false);
  }

  const selectCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // 카테고리 드롭다운 text 설정
    setCategoryText(e.currentTarget.innerText);

    // 카테고리 Value 값 설정
    const value = e.currentTarget.dataset.value
    if (value){
      setCategoryValue(value);
    }
    setIsCategoryOpen(false);
  }

  const showCountry = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsCountryOpen(!isCountryOpen);
    setIsCategoryOpen(false);
  }

  const selectCountry = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // 국가 드롭다운 text 설정
    setCountryText(e.currentTarget.innerText);

    // 국가 Value 값 설정
    const value = e.currentTarget.dataset.value
    if (value){
      setCountryValue(value);
    }
    setIsCountryOpen(false);
  }

  const closeDropDown = () => {
    setIsCountryOpen(false);
    setIsCategoryOpen(false);
  }

  useEffect(() => {
    if (title.trim() && content.trim() && categoryValue.trim()) {
      setIsSubmitDisabled(false)
    }
    else {
      setIsSubmitDisabled(true)
    }
  }, [title, content, categoryValue])

  return (
    // 게시글 작성 페이지 Container
    <div className={`pl-[260px] pr-[260px]`} onClick={closeDropDown}>
      <div className={`flex mt-[48px] mb-[12px] justify-between`}>
        <h1 className={`text-display2-b text-gray-600`}>
          게시글 작성
        </h1>
        <button
          className={`px-4 py-1 rounded-[4px] bg-primary-300 text-white disabled:bg-gray-100 disabled:text-gray-400`}
          disabled={isSubmitDisabled}>
          등록
        </button>
      </div>
      {/* 게시글 작성 box */}
      <div className={`p-6 flex gap-5 flex-col rounded-[8px] border border-gray-100 min-h-[726px]`}>
        {/* dropdown wrapper */}
        <div className={`grid grid-cols-2 gap-6 w-[100%]`}>
          <div className={`flex rounded-[4px] border border-gray-100 text-gray-600 text-subhead1-sb outline-0 grow`}>
            <div
              className={`flex justify-between content-center h-full relative px-6 py-3 grow select-none`}
              onClick={showCategory}>
              {categoryText}
              <DropdownArrowIcon className={`self-center`} />
              <div
                className={`px-6 py-5 w-full top-14 left-0 absolute flex-col gap-4 bg-white rounded-[4px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] select-none z-20 ${isCategoryOpen ? `flex` : `hidden`}`}>
                {/* 선택 항목이 잘 안보여서 임의로 hover 시 bg-color 설정 */}
                <div data-value="FORUM" className={`hover:bg-gray-100`} onClick={selectCategory}>자유</div>
                <div data-value="PHARMACY" className={`hover:bg-gray-100`} onClick={selectCategory}>약국</div>
                <div data-value="HOSPITAL" className={`hover:bg-gray-100`} onClick={selectCategory}>병원</div>
                <div data-value="MEDICATION" className={`hover:bg-gray-100`} onClick={selectCategory}>약</div>
                <div data-value="SYMPTOM" className={`hover:bg-gray-100`} onClick={selectCategory}>증상</div>
                <div data-value="SUPPLEMENT" className={`hover:bg-gray-100`} onClick={selectCategory}>영양제</div>
              </div>
            </div>
          </div>

          <div className={`flex rounded-[4px] border border-gray-100 text-gray-600 text-subhead1-sb outline-0 grow`}>
            <div
              className={`flex justify-between content-center h-full relative px-6 py-3 grow select-none`}
              onClick={showCountry}>
              {countryText}
              <DropdownArrowIcon className={`self-center`} />
              <div
                className={`px-6 py-5 w-full top-14 left-0 absolute flex-col gap-4 bg-white rounded-[4px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] select-none z-20 ${isCountryOpen ? `flex` : `hidden`}`}>
                {/* 선택 항목이 잘 안보여서 임의로 hover 시 bg-color 설정 */}
                <div data-value="NONE" className={`hover:bg-gray-100`} onClick={selectCountry}>선택 안 함</div>
                <div data-value="KOREA" className={`hover:bg-gray-100`} onClick={selectCountry}>한국</div>
                <div data-value="JAPAN" className={`hover:bg-gray-100`} onClick={selectCountry}>일본</div>
                <div data-value="CHINA" className={`hover:bg-gray-100`} onClick={selectCountry}>중국</div>
                <div data-value="USA" className={`hover:bg-gray-100`} onClick={selectCountry}>미국</div>
                <div data-value="CANADA" className={`hover:bg-gray-100`} onClick={selectCountry}>캐나다</div>
                <div data-value="AUSTRALIA" className={`hover:bg-gray-100`} onClick={selectCountry}>호주</div>
                <div data-value="THAILAND" className={`hover:bg-gray-100`} onClick={selectCountry}>태국</div>
                <div data-value="VIETNAM" className={`hover:bg-gray-100`} onClick={selectCountry}>베트남</div>
                <div data-value="PHILIPPINES" className={`hover:bg-gray-100`} onClick={selectCountry}>필리핀</div>
                <div data-value="SINGAPORE" className={`hover:bg-gray-100`} onClick={selectCountry}>싱가포르</div>
                <div data-value="EUROPE" className={`hover:bg-gray-100`} onClick={selectCountry}>유럽</div>
              </div>
            </div>

          </div>
        </div>

        <input
          className={`px-6 py-5 outline-0 bg-gray-50 text-subhead1-sb text-gray-600  rounded-[4px] placeholder-gray-400 placeholder:text-body1-r`}
          placeholder="제목을 입력하세요."
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}>
        </input>

        <div className={`flex flex-col rounded-[4px] px-6 py-5 border border-gray-100 grow`}>
          <textarea
            ref={textareaRef}
            className={`h-auto resize-none grow outline-0 text-body1 text-gray-600 overflow-hidden placeholder-gray-300`}
            placeholder="내용을 입력하세요."
            value={content}
            maxLength={3000}
            onChange={handleTextareaHeight}>

          </textarea>
          {uploadImage &&
            <div className={`relative mt-5 group`}>
              <Image
                src={uploadImage}
                alt="이미지"
                width={100}
                height={100}
                className={`w-full`} />

              {/* Image에 hover 시 X 버튼 등장 */}
              <XIcon
                onClick={() => setUploadImage("")}
                className={`absolute top-3 right-3 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out`} />
            </div>
          }
          <div className={`flex justify-between mt-5`}>
            <label
              htmlFor="file"
              className={`flex gap-2 text-center`}>
              <CameraIcon />
              <p className={`self-center text-subhead2-sb text-gray-400 cursor-pointer`}>사진 삽입하기</p>

            </label>
            <input
              id="file"
              type="file"
              className={`hidden`}
              onChange={handleImageUpload} 
              // 파일 등록 사진으로 제한
              accept="image/*"/>

            <p className={`text-gray-300`}>{content.length}/3000</p>
          </div>
        </div>
      </div>
    </div >
  );
}
