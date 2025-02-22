import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import ActivitiesNav from "./components/ActivitiesNav";
import { useRouter } from "next/router";
import MyCommentList from "./components/MyCommentList";
import MyNotificationList from "./components/MyNotificationList";

interface MyList {
  id: number;
  isSelected: boolean;
}

const Activities = () => {
  const router = useRouter();
  const { tab } = router.query;
  const currentTab = tab || "posts";

  const [myList, setMyList] = useState<MyList[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [isAllSelected, setIsAllSelected] = useState(false);

  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsAllSelected(myList?.every(item => item.isSelected))
    setSelectedIds(myList?.filter(item => item.isSelected).map(item => item.id));
    console.log(myList)
  }, [myList])

  useEffect(() => {
    setPage(1)
  }, [router])

  return (
    <div className="w-full min-h-[calc(100vh-279px)] h-full items-center flex flex-col lg:pt-9 pt-5">
      <div className="
        lg:w-[900px]
        md:w-[601px] 
        md:px-0 px-5 mx-auto w-full grow flex flex-col">
        <ActivitiesNav />
        <div className={`h-full grow flex flex-col`}>
          {currentTab === "posts" &&
            <PostList
              page={page}
              setPage={setPage}
              isMyPostPage={true}
              myList={myList}
              setMyList={setMyList}
              isAllSelected={isAllSelected}
              selectedIds={selectedIds} />}
          {currentTab === "comments" &&
            <MyCommentList
              page={page}
              setPage={setPage}
              myList={myList}
              setMyList={setMyList}
              isAllSelected={isAllSelected}
              selectedIds={selectedIds} />}
          {currentTab === "scraps" &&
            <PostList
              page={page}
              setPage={setPage}
              isMyScrapPage={true}
              myList={myList}
              setMyList={setMyList}
              isAllSelected={isAllSelected}
              selectedIds={selectedIds} />}
          {currentTab === "notifications" &&
            <MyNotificationList 
              page={page}
              setPage={setPage}/>}
        </div>
      </div>
    </div>
  );
};

export default Activities;
