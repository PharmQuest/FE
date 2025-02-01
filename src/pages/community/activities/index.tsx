import React, { useState } from "react";
import PostList from "../components/PostList";
import ActivitiesNav from "./components/ActivitiesNav";
import { useRouter } from "next/router";
import MyCommentList from "./components/MyCommentList";
import MyNotificationList from "./components/MyNotificationList";

const Activities = () => {
  const router = useRouter();
  const { tab } = router.query;
  const currentTab = tab || "posts";

  const [page, setPage] = useState(0);

  return (
    <div className="w-full h-full items-center flex flex-col lg:pt-9 pt-5 pb-[100px]">
      <div className="lg:w-[900px] md:w-[601px] md:px-0 px-5">
        <ActivitiesNav />
        <div>
          {currentTab === "posts" && <PostList page={page} setPage={setPage} />}
          {currentTab === "comments" && <MyCommentList />}
          {currentTab === "scraps" && (
            <PostList page={page} setPage={setPage} />
          )}
          {currentTab === "notifications" && <MyNotificationList />}
        </div>
      </div>
    </div>
  );
};

export default Activities;
