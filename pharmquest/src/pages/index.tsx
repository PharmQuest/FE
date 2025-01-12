import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <div className='h-[1006px] bg-green-100'>
        <Header/>
        <div className="w-[293px] h-[171px] pl-5 py-6 bg-[#138e5d] rounded-xl flex-col justify-start items-start gap-[45px] inline-flex">
    <div className="justify-start items-center gap-2 inline-flex">
        <div className="text-white text-xl font-bold font-['Pretendard Variable'] leading-[30px]">상비약 리스트</div>
    </div>
    <div className="text-white text-base font-normal font-['Pretendard Variable'] leading-normal">증상 및 약 이름을 검색하고<br/>필요한 상비약 정보를 얻을 수 있어요.</div>
</div>
        <button className='flex w-[293px] h-[171px] py-6 px-2 flex-col items-start gap-[45px] rounded-xl bg-green-500 mt-[128px] ml-[260px]'>
          <div className='flex items-center gap-2 text-white mt-6 text-headline-b'>
            <div>상비약 리스트</div>
            <div>&gt;</div>
          </div>
          <div className="text-white text-base font-normal font-['Pretendard Variable'] leading-normal">증상 및 약 이름을 검색하고<br/>필요한 상비약 정보를 얻을 수 있어요.</div>
          
        </button>
      </div>
      <Footer/>
    </>
  );
}