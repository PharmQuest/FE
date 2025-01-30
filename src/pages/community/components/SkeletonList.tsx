import SkeletonItem from "./SkeletonItem";

const SkeletonList = ({listNum} : {listNum: number}) => {
  return (
    <>
      {Array.from({ length: listNum }, (_, i) => (
        <SkeletonItem key={i} />
      ))}
    </>
  )
}

export default SkeletonList;