// 커뮤니티_BEST 게시글

import PopularPostList from "../components/PopularPostList";
import UserNavbar from "../components/UserNavbar";
import Posts from "../../../mocks/popularPosts";
import { useEffect, useState } from "react";


export default function Community() {

  const [position, setPosition] = useState(48);

  const handleScroll = () => {
    // 추후 throttling 적용 예정
    const scrollTop = (window.scrollY - 148 > 48) ? (window.scrollY - 148) : 48;
    setPosition(scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);


  return (
    <div className={`relative overflow-hidden`}>
      <div className="px-[260px] mt-9">
        <div className="flex flex-row gap-x-4 mt-3 ">
          <div className={`flex flex-col grow`}>
            <div className={`flex justify-between mb-3`}>
              <p className="text-display2-b text-gray-600">BEST 인기글</p>
            </div>
            <PopularPostList posts={Posts} />
          </div>


          <div className={`relative transition-all duration-500 ease-out`}
            style={{ top: `${position}px` }}>
            <UserNavbar />
          </div>
        </div>
      </div>
    </div>
  )
}
