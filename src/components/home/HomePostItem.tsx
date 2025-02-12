import { format } from "date-fns";
import { useRouter } from "next/router";

interface HomePostItemProp {
  title: string;
  category: string;
  post_id: number;
  created_at: string;
  isBestPost?: boolean;
};  

const HomePostItem:React.FC<HomePostItemProp> = ({
  title,
  category,
  post_id,
  created_at,
  isBestPost = false,
}) => {

  const router = useRouter();
  
  const date = new Date(created_at);
  const formattedDate = isNaN(date.getTime()) ? "not date" : format(date, "yyyy.MM.dd")

  return (
    <div 
      className="self-stretch lg:py-2 py-1 justify-between items-start inline-flex cursor-pointer"
      onClick={() => {router.push(`/community/post/${[post_id]}`)}}>
      <div className="h-[29px] flex-1 justify-start items-center gap-2 flex min-w-0">
        <div className="lg:w-16 w-[47px] lg:h-6 h-5 px-1.5 pt-0.5 pb-px bg-[#a0d1be] rounded justify-center items-center gap-2.5 flex shrink-0">
          <div className="text-center text-white lg:text-sm text-[10px] font-normal font-['Pretendard Variable'] leading-[21px]">
            {category}
          </div>
        </div>
        <div className="text-left overflow-hidden text-ellipsis whitespace-nowrap text-[#474747] lg:text-base text-sm font-normal font-['Pretendard Variable'] leading-normal min-w-0">
          {title}
        </div>
        {isBestPost && (
          <div className="h-[20px] px-1.5 py-0.5 rounded-full border-2 border-[#ff7700] justify-center items-center gap-2.5 flex">
            <div className="text-center text-[#ff7700] lg:text-xs text-[10px] font-semibold font-['Pretendard Variable'] leading-[18px]">
              BEST
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center h-full text-center text-[#999999] lg:text-sm text-xs font-normal font-['Pretendard Variable'] leading-[21px] lg:ml-4 ml-8 shrink-0">
        {formattedDate}
      </div>
    </div>
  )

}

export default HomePostItem;