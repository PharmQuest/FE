import PopularSkeletonItem from "./PopularSkeletonItem";


const PopularSkeletonList = ({listNum} : {listNum: number}) => {
  return (
    <div className={`flex flex-col gap-2.5`}>
      {Array.from({ length: listNum }, (_, i) => (
        <PopularSkeletonItem key={i} />
      ))}
    </div>
  )
}

export default PopularSkeletonList;