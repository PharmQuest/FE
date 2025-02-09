// 커뮤니티_BEST 게시글

import PopularPostList from "../components/PopularPostList";
import UserNavbar from "../components/UserNavbar";
import { useEffect, useState } from "react";
import useScroll from "../../../hooks/community/useScroll";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/apis/axios-instance";
import PageNavigator from "../components/PageNavigator";

export default function Community() {

  const { position, handleScroll } = useScroll(1050);
  const [page, setPage] = useState(1);

  const getBestPost = async () => {
    try{
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/community/best-posts/lists?page=${page}`);
      return response.data;
    }catch (e) {
      console.log(e)
    }
  }

  const { data } = useQuery(
    {
      queryKey: ["bestPost", page],
      queryFn: getBestPost,
      placeholderData: keepPreviousData,
    },
  )

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
          <div className={`md:mb-3 flex justify-between`}>
            <p
              className="
                  lg:text-display2-b
                  text-m-headline1-b text-gray-600">BEST 인기글</p>
          </div>
          <PopularPostList posts={data?.result?.postList} />
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
      <div className={`mt-12`}>
        <PageNavigator totalPage={data?.result?.totalPage} isFirst={data?.result?.isFirst} isLast={data?.result?.isLast} page={page} setPage={setPage}/>
      </div>
    </div>
  )
}
