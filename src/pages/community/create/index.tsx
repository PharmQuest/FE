// 커뮤니티_게시글 작성

import { CameraIcon, DropdownArrowIcon, XIcon } from "@public/svgs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CreatePost() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("자유 주제");
  const [country, setCountry] = useState("위치 추가");

  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const [uploadImage, setUploadImage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

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

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  const showTag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsTagOpen(!isTagOpen);
    setIsCountryOpen(false);
  }

  const selectTag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setTag(e.currentTarget.innerText);
    setIsTagOpen(false);
  }

  const showCountry = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsCountryOpen(!isCountryOpen);
    setIsTagOpen(false);
  }

  const selectCountry = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setCountry(e.currentTarget.innerText);
    setIsCountryOpen(false);
  }

  const closeDropDown = () => {
    setIsCountryOpen(false);
    setIsTagOpen(false);
  }

  useEffect(() => {
    if (title.trim() && content.trim() && tag.trim()) {
      setIsDisabled(false)
    }
    else {
      setIsDisabled(true)
    }
  }, [title, content, tag])

  return (
    // 게시글 작성 페이지 Container
    <div className={`pl-[260px] pr-[260px]`} onClick={closeDropDown}>
      <div className={`flex mt-[48px] mb-[12px] justify-between`}>
        <h1 className={`text-display2-b text-gray-600`}>
          게시글 작성
        </h1>
        <button
          className={`px-4 py-1 rounded-[4px] bg-primary-300 text-white disabled:bg-gray-100 disabled:text-gray-400`}
          disabled={isDisabled}>
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
              onClick={showTag}>
              {tag}
              <DropdownArrowIcon className={`self-center`} />
              <div
                className={`px-6 py-5 w-full top-14 left-0 absolute flex-col gap-4 bg-white rounded-[4px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] select-none z-20 ${isTagOpen ? `flex` : `hidden`}`}>
                {/* 선택 항목이 잘 안보여서 임의로 hover 시 bg-color 설정 */}
                <div className={`hover:bg-gray-100`} onClick={selectTag}>자유</div>
                <div className={`hover:bg-gray-100`} onClick={selectTag}>약국</div>
                <div className={`hover:bg-gray-100`} onClick={selectTag}>병원</div>
                <div className={`hover:bg-gray-100`} onClick={selectTag}>약</div>
                <div className={`hover:bg-gray-100`} onClick={selectTag}>증상</div>
                <div className={`hover:bg-gray-100`} onClick={selectTag}>영양제</div>
              </div>
            </div>
          </div>

          <div className={`flex rounded-[4px] border border-gray-100 text-gray-600 text-subhead1-sb outline-0 grow`}>
            <div
              className={`flex justify-between content-center h-full relative px-6 py-3 grow select-none`}
              onClick={showCountry}>
              {country}
              <DropdownArrowIcon className={`self-center`} />
              <div
                className={`px-6 py-5 w-full top-14 left-0 absolute flex-col gap-4 bg-white rounded-[4px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] select-none z-20 ${isCountryOpen ? `flex` : `hidden`}`}>
                {/* 선택 항목이 잘 안보여서 임의로 hover 시 bg-color 설정 */}
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>선택 안 함</div>
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>한국</div>
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>일본</div>
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>중국</div>
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>미국</div>
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>캐나다</div>
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>호주</div>
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>태국</div>
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>베트남</div>
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>필리핀</div>
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>싱가포르</div>
                <div className={`hover:bg-gray-100`} onClick={selectCountry}>유럽</div>
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
            onChange={handleTextarea}>

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
              onChange={handleImageUpload} />

            <p className={`text-gray-300`}>{content.length}/3000</p>
          </div>
        </div>
      </div>
    </div >
  );
}
