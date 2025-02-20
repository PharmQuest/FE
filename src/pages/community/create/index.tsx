// 커뮤니티_게시글 작성

import { CameraIcon, LeftArrowIcon, XIcon } from "@public/svgs";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../components/Dropdown";
import usePostMutation from "../../../hooks/community/usePostMutation";
import useModalStore from "@/store/useModalStore";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/router";

type DropdownInfo = {
  key: string;
  value: string;
};

export default function CreatePost() {

  const {
    setIsNoticeModalOpen,
    setNoticeModalText,
  } = useModalStore((state) => state)

  const {
    isLoggedIn,
  } = useAuthStore()

  const router = useRouter();

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

  const [file, setFile] = useState<File | null>(null);

  const [uploadImage, setUploadImage] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(e.target.files?.[0] || null)
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

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  const handleXButton = () => {
    setUploadImage("")
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const mutate = usePostMutation(
    `${process.env.NEXT_PUBLIC_DOMAIN}/community/posts`
  );

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      const json=JSON.stringify({
        title,
        content,
        country,
        category,
      });
      const jsonBlob = new Blob([json], { type: "application/json" });
      data.append("request", jsonBlob);
      if(file) {
        data.append("file", file);
      }
      
      await mutate(data)

      setIsNoticeModalOpen(true);
      setNoticeModalText("게시글 작성을 완료했습니다.")
    } catch (error) {
      console.log(error)
      setIsNoticeModalOpen(true);
      setNoticeModalText("게시글 작성에 실패했습니다.")
    }
  }

  useEffect(() => {
    if(isLoggedIn === false){
      router.push("/login")
    }
    
  }, []);

  useEffect(() => {
    if (title.trim() && content.trim() && category.trim()) {
      setIsSubmitDisabled(false)
    }
    else {
      setIsSubmitDisabled(true)
    }
  }, [title, content, category])

  return (
    <>
      <div
        className={`
          md:hidden
          z-[999] flex sticky top-0 bg-white px-5 py-4 justify-between shadow-[0px_2px_5px_0px_rgba(0,0,0,0.05)]`}>
        <div className={`flex gap-3 text-m-headline1-b text-gray-600 items-center`}>
          <LeftArrowIcon className={`h-[22px]`} />
          게시글 작성
        </div>
        <button
          className={`px-4 py-1 rounded-[4px] bg-primary-300 text-m-subhead1-sb text-white disabled:bg-gray-100 disabled:text-gray-400`}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}>
          등록
        </button>
      </div>

      <div className={`
            lg:max-w-[900px] 
            md:max-w-[600px] md:mx-auto`}>
        <div 
          className={`
            md:flex
            hidden mt-[48px] mb-[12px] justify-between`}>
          <h1
            className={`text-display2-b text-gray-600`}>
            게시글 작성
          </h1>
          <button
            className={`
              md:block
              hidden px-4 py-1 rounded-[4px] bg-primary-300 text-subhead1-sb text-white disabled:bg-gray-100 disabled:text-gray-400`}
            disabled={isSubmitDisabled}
            onClick={handleSubmit}>
            등록
          </button>
        </div>
        {/* 게시글 작성 box */}
        <div className={`
            md:border md:gap-5
            gap-2 p-6 flex flex-col rounded-[8px] border-0 border-gray-100 min-h-[726px]`}>

          {/* dropdown wrapper */}
          <div className={`grid grid-cols-2 gap-6 w-[100%]`}>

            <Dropdown info={categoryInfo} initialText={"주제 선택"} value={category} setValue={setCategory} />
            <Dropdown info={countryInfo} initialText={"위치 추가 (선택)"} value={country} setValue={setCountry} />

          </div>

          <input
            className={`
              md:text-subhead1-sb md:placeholder:text-body1-r md:px-6 md:py-5
              text-m-subhead1-sb placeholder:text-m-body2-r px-4 py-3 outline-0 bg-gray-50 text-gray-600  rounded-[4px] placeholder-gray-400`}
            placeholder="제목을 입력하세요."
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}>
          </input>

          <div 
            className={`
              md:px-6 md:py-5
              px-4 py-5 flex flex-col rounded-[4px] border border-gray-100 grow`}>
            <textarea
              ref={textareaRef}
              className={`
                md:text-subhead1-sb md:placeholder:text-body1-r
                text-m-body2-r h-auto resize-none grow outline-0 text-body1 text-gray-600 overflow-hidden placeholder-gray-300`}
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
                  onClick={handleXButton}
                  className={`w-5 absolute top-3 right-3 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out`} />
              </div>
            }
            <div className={`flex justify-between mt-5`}>
              <label
                htmlFor="file"
                className={`
                  md:gap-2
                  gap-1.5 flex text-center`}>
                <CameraIcon
                  className={`
                    md:w-6
                    w-[20px]`}/>
                <p 
                  className={`
                    md:text-subhead2-sb
                    text-m-subhead1-sb self-center text-gray-400 cursor-pointer`}>사진 삽입하기</p>

              </label>
              <input
                ref={fileInputRef}
                id="file"
                type="file"
                className={`hidden`}
                onChange={handleImageUpload}
                // 파일 등록 사진으로 제한
                accept="image/*" />
              <p 
                className={`
                  md:text-body1-r
                  text-m-body2-r text-gray-300`}>{content.length}/3000</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
