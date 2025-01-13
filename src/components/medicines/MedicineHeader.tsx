

const MedicineHeader = () => {
  return (
    <>
      <div className={`pl-[260px] pr-[260px] min-h-[248px] bg-background flex flex-col`}>
        <div className={`h-[110px]`}>헤더 넣을 자리</div>
        <div>  
          <div className={`flex items-center gap-5`}>
            <h1 className={`text-display1-b text-gray-600 min-w-[152px]`}>상비약 리스트</h1>
            <p className={`text-body2-r text-gray-300`}>본 웹 사이트는 사용자의 편의를 위한 단순 참고용 정보 제공을 목표로 하며, 제공되는 정보는 의료 전문가의 조언을 대체 하지 않습니다.</p>
          </div>

          {/* 나중에 검색어 컴포넌트로 대체 */}
          <div className={`h-10 mt-5 mb-9 bg-white rounded-full content-center flex items-center`}>
            <img src='/svgs/search.svg' className={`w-6 h-6 ml-4`}></img>
            <input placeholder='복통약' className={`outline-none bg-none ml-2 mr-4 flex-grow text-gray-500 placeholder:text-gray-300`}></input>
          </div>
        </div>
      </div>
    </>
  )
}

export default MedicineHeader;