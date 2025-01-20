// 커뮤니티_게시글 작성

import { CameraIcon } from "@public/svgs";
import { useEffect, useRef, useState } from "react";

export default function CreatePost() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("자유 주제");
  const [country, setCountry] = useState("위치 추가");

  const [isShowTag, setIsShowTag] = useState("hidden");
  const [isShowCountry, setIsShowCountry] = useState("hidden");

  const [uploadImage, setUploadImage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const textareaRef = useRef(null);

  const handleTextarea = (e: React.ChangeEvent) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  useEffect(() => {
    console.log(isShowTag);
  }, [isShowTag])

  const handleSelectTag = (e) => {
    e.stopPropagation();
    setTag(e.currentTarget.innerText);
    setIsShowTag("hidden");
  }

  const handleSelectCountry = (e) => {
    e.stopPropagation();
    setCountry(e.currentTarget.innerText);
    setIsShowCountry("hidden");
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
    <div className={`pl-[260px] pr-[260px] `}>
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
        <div className={`flex gap-6 w-[100%]`}>
          <div className={`rounded-[4px] border border-gray-100 text-gray-600 text-subhead1-sb outline-0 grow`}>
            <div
              className={`content-center h-full relative px-6 py-3 grow`}
              onClick={() => setIsShowTag("flex")}>
              {tag}
              <div className={`px-6 py-5 w-full top-14 left-0 absolute flex-col gap-4 bg-white rounded-[4px] shadow-md ${isShowTag}`}>
                <div onClick={handleSelectTag}>자유</div>
                <div onClick={handleSelectTag}>약국</div>
                <div onClick={handleSelectTag}>병원</div>
                <div onClick={handleSelectTag}>약</div>
                <div onClick={handleSelectTag}>증상</div>
                <div onClick={handleSelectTag}>영양제</div>
              </div>
            </div>
          </div>

          <div className={`rounded-[4px] border border-gray-100 text-gray-600 text-subhead1-sb outline-0 grow`}>
            <div
              className={`content-center h-full relative px-6 py-3 grow`}
              onClick={() => setIsShowCountry("flex")}>
              {country}
              <div className={`px-6 py-5 w-full top-14 left-0 absolute flex-col gap-4 bg-white rounded-[4px] shadow-md ${isShowCountry}`}>
                <div onClick={handleSelectCountry}>선택 안 함</div>
                <div onClick={handleSelectCountry}>한국</div>
                <div onClick={handleSelectCountry}>미국</div>
              </div>
            </div>

          </div>
        </div>

        <input
          className={`px-6 py-5 outline-0 bg-gray-50 text-gray-400 rounded-[4px] placeholder:text-gray-300`}
          placeholder="제목을 입력하세요."
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}>
        </input>

        <div className={`flex flex-col rounded-[4px] px-6 py-5 border text-gray-600 border-gray-100 grow`}>
          <textarea
            ref={textareaRef}
            className={`h-auto resize-none grow outline-0 text-gray-600 placeholder:text-gray-300 overflow-hidden`}
            placeholder="내용을 입력하세요."
            value={content}
            maxLength={3000}
            onChange={handleTextarea}>

          </textarea>
          {uploadImage &&
            <img
              src={uploadImage}
              className={`mt-5 w-full`} />
          }
          <div className={`flex justify-between mt-5`}>
            <label
              for="file"
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
