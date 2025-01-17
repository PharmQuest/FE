import React from "react";
import PostList from "../components/PostList";
import ActivitiesNav from "./components/ActivitiesNav";
import { useRouter } from "next/router";
import MyCommentList from "./components/MyCommentList";
import MyNotificationList from "./components/MyNotificationList";

const activities = () => {
  const router = useRouter();
  const { tab } = router.query;
  const currentTab = tab || "posts";

  return (
    <div className="flex flex-col px-[260px] py-[100px]">
      <p className="text-display2-b text-gray-600 mb-1">나의 활동</p>
      <ActivitiesNav />
      <div>
        {currentTab === "posts" && <PostList />}
        {currentTab === "comments" && <MyCommentList />}
        {currentTab === "scraps" && <PostList />}
        {currentTab === "notifications" && <MyNotificationList />}
      </div>
    </div>
  );
};

export default activities;
