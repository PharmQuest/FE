const SkeletonItem = () => {

  return (
    <div className="py-3 h-12 grid grid-cols-[1fr_7fr_6fr] gap-2 border-b border-solid border-gray-100 animate-pulse relative -z-10">
      <div className={`w-16 text-white rounded whitespace-nowrap flex justify-center items-center bg-gray-100`}/>
      <div className="truncate flex text-body1-r text-gray-500 cursor-pointer gap-2">
        <p className={`rounded w-[calc(100%-20px)] truncate bg-gray-100`}/>
      </div>

      <div className="grid grid-flow-col gap-5 text-center items-center justify-items-center text-body2-r text-gray-300 w-full">
        <p className={`w-[73px] h-6 bg-gray-100 rounded`} />
        <p className={`w-[73px] h-6 bg-gray-100 rounded`} />
        <div className={`flex gap-5`}>
          <p className={`w-[36px] h-6 bg-gray-100 rounded`} />
          <p className={`w-[36px] h-6 bg-gray-100 rounded`} />
          <p className={`w-[42px] h-6 bg-gray-100 rounded`} />
        </div>
      </div>
    </div>
  )
}

export default SkeletonItem;