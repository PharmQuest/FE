import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ActivitiesNav = () => {
  const router = useRouter();
  const { tab } = router.query;

  const navbarItems = ["게시글", "댓글", "스크랩", "알림"];
  const tabMap: Record<string, string> = {
    게시글: "posts",
    댓글: "comments",
    스크랩: "scraps",
    알림: "notifications",
  };

  const [activeItem, setActiveItem] = useState<string>(
    Object.keys(tabMap).find((key) => tabMap[key] === tab) || "게시글"
  );

  const handleTabChange = (item: string) => {
    const tabKey = tabMap[item];
    if (tabKey) {
      setActiveItem(item);
      router.push(`/community/activities?tab=${tabKey}`);
    }
  };

  useEffect(() => {
    const newActiveItem = Object.keys(tabMap).find(
      (key) => tabMap[key] === tab
    );
    if (newActiveItem) {
      setActiveItem(newActiveItem);
    }
  }, [tab]);

  return (
    <div
      className="flex flex-row w-full border-solid border-b border-gray-100 
          max-md:grid max-md:grid-cols-4 max-md:text-center"
    >
      {navbarItems.map((item) => (
        <div
          key={item}
          onClick={() => handleTabChange(item)}
          className={`px-3 py-4 cursor-pointer ${
            activeItem === item
              ? "text-subhead1-sb text-gray-600 border-solid border-b-2 border-gray-600"
              : "text-body1-r text-gray-400"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default ActivitiesNav;
