// 커뮤니티_BEST 게시글

import PopularPostList from "../components/PopularPostList";
import UserNavbar from "../components/UserNavbar";
import Posts from "../../../mocks/popularPosts";
import { useEffect } from "react";
import useScroll from "../../../hooks/community/useScroll";

export default function Community() {

  const {position, handleScroll} = useScroll(650);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);


  return (
    <div className={`relative overflow-hidden`}>
      <div className="max-w-[900px] mx-auto mt-9">
        <div className="flex flex-row gap-x-4 mt-3 ">
          <div className={`flex flex-col grow`}>
            <div className={`flex justify-between mb-3`}>
              <p className="text-display2-b text-gray-600 mx-5">BEST 인기글</p>
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
