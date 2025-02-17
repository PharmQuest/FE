import MobileSkeletonItem from "./MobileSkeletonItem";


const MobileSkeletonList = ({listNum} : {listNum: number}) => {
  return (
    <div className={`flex flex-col gap-2.5 mt-4`}>
      {Array.from({ length: listNum }, (_, i) => (
        <MobileSkeletonItem key={i} />
      ))}
    </div>
  )
}

export default MobileSkeletonList;