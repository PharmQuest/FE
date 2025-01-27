// 커뮤니티_게시글 작성

import { CameraIcon, XIcon } from "@public/svgs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../components/Dropdown";
import useCustomMutation from "../../../hooks/community/useCustomMutation";
import useStore from "@/store/useStore";

type DropdownInfo = {
  key: string;
  value: string;
};

export default function CreatePost() {

  const {
    setIsNoticeModalOpen,
    setNoticeModalText,
  } = useStore((state) => state)

  const categoryInfo: DropdownInfo[] = [
    { key: "FORUM", value: "자유" },
    { key: "PHARMACY", value: "약국" },
    { key: "HOSPITAL", value: "병원" },
    { key: "MEDICATION", value: "약" },
    { key: "SYMPTOM", value: "증상" },
    { key: "SUPPLEMENT", value: "영양제" },
  ]
  const countryInfo: DropdownInfo[] = [
    { key: "NONE", value: "선택 안 함" },
    { key: "KOREA", value: "한국" },
    { key: "JAPAN", value: "일본" },
    { key: "CHINA", value: "중국" },
    { key: "USA", value: "미국" },
    { key: "CANADA", value: "캐나다" },
    { key: "AUSTRALIA", value: "호주" },
    { key: "THAILAND", value: "태국" },
    { key: "VIETNAM", value: "베트남" },
    { key: "PHILIPPINES", value: "필리핀" },
    { key: "SINGAPORE", value: "싱가포르" },
    { key: "EUROPE", value: "유럽" },
  ]

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("NONE");

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


  // 추후에 url 및 데이터 구조 수정 필요
  const mutate = useCustomMutation(
    `${process.env.NEXT_PUBLIC_DOMAIN}/community/posts`,
    {
      title,
      content,
      country,
      category,
    },
  )

  const handleSubmit = async () => {
    try {
      await mutate()
      setIsNoticeModalOpen(true);
      setNoticeModalText("게시글 작성을 완료했습니다.")
    } catch (error) {
      console.log(error)
      setIsNoticeModalOpen(true);
      setNoticeModalText("게시글 작성에 실패했습니다.")
    }
  }

  useEffect(() => {
    if (title.trim() && content.trim() && category.trim()) {
      setIsSubmitDisabled(false)
    }
    else {
      setIsSubmitDisabled(true)
    }
  }, [title, content, category])

  return (
    // 게시글 작성 페이지 Container
    <div className={`max-w-[900px] mx-auto`}>
      <div className={`flex mt-[48px] mb-[12px] justify-between`}>
        <h1 className={`text-display2-b text-gray-600`}>
          게시글 작성
        </h1>
        <button
          className={`px-4 py-1 rounded-[4px] bg-primary-300 text-white disabled:bg-gray-100 disabled:text-gray-400`}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}>
          등록
        </button>
      </div>
      {/* 게시글 작성 box */}
      <div className={`p-6 flex gap-5 flex-col rounded-[8px] border border-gray-100 min-h-[726px]`}>

        {/* dropdown wrapper */}
        <div className={`grid grid-cols-2 gap-6 w-[100%]`}>

          <Dropdown info={categoryInfo} initialText={"주제 선택"} setValue={setCategory} />
          <Dropdown info={countryInfo} initialText={"위치 추가 (선택)"} setValue={setCountry} />

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
              accept="image/*" />

            <p className={`text-gray-300`}>{content.length}/3000</p>
          </div>
        </div>
      </div>
    </div >
  );
}
