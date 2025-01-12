import React from 'react'

const Header = () => {
  return (
    <>
      <div className="w-full h-[102px] shrink-0 bg-white justify-center items-center rounded-b-1px border-solid flex box-border gap-2.5">
        <button className='ml-[262px] my-7 flex w-[155px] h-[46px] py-2 px-10 shrink-0 bg-gray-100 text-[20px] font-semibold'>로고 타입</button>
        <span className='flex ml-[52px] mr-[260px] w-[739px] h-[46px] py-2 cursor-pointer text-headline-m my-7 items-center m-auto'>
          <button className='w-[141px]'>상비약 리스트</button>
          <button className="ml-[29px] w-[107px] px-4">약국 찾기</button>
          <button className="ml-[29px] w-[102px] px-4">커뮤니티</button>
          <button className="ml-[29px] w-[163px] px-4">해외 인기 영양제</button>
          <button className="ml-[29px] w-[90px] h-10 flex py-2 px-6 rounded-lg bg-orange-500 cursor-pointer text-subhead1-sb text-white">로그인</button>
        </span>
      </div>
    </>
  )
}

export default Header