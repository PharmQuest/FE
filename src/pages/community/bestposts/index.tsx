// 커뮤니티_BEST 게시글

import PopularPostList from "../components/PopularPostList";
import UserNavbar from "../components/UserNavbar";
import Posts from "../../../mocks/popularPosts";
import { useEffect } from "react";
import useScroll from "../../../hooks/community/useScroll";

export default function Community() {

  const { position, handleScroll } = useScroll(650);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);


  return (
    <div
      className="
          lg:max-w-[900px] lg:mx-auto lg:px-0
          md:max-w-[600px] md:mx-auto md:px-0 md:mt-9
          w-full px-5">
      <div
          className="
            lg:flex lg:flex-row lg:gap-x-4
            mt-3 grow">
        <div className={`flex flex-col grow`}>
          <div className={`flex justify-between mb-3`}>
            <p
              className="
                  lg:text-display2-b
                  text-m-headline1-b text-gray-600">BEST 인기글</p>
          </div>
          <PopularPostList posts={Posts} />
        </div>

        <div>
            <div
              className={`
              lg:block
              hidden relative transition-all duration-500 ease-out`}
              style={{ top: `${position}px` }}>
              <UserNavbar />
            </div>
          </div>
      </div>
    </div>
  )
}
