import React, { Dispatch } from "react";
import MyNotificationItem from "./MyNotificationItem";
import { axiosInstance } from "@/apis/axios-instance";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PageNavigator from "../../../../components/common/PageNavigator";

interface Notification {
  postId: number;
  postTitle: string;
  commentWriter: string;
  commentContent: string;
  createdAt: string;
}

interface MyCommentListProp {
  page: number;
  setPage: Dispatch<React.SetStateAction<number>>
}

const MyNotificationList: React.FC<MyCommentListProp> = ({
  page,
  setPage,
}) => {

  const getMyComments = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_DOMAIN}/mypage/activities/notification`, {
        params: {
          page,
        }
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  const { data, isPending } = useQuery({
    queryKey: ["myComments", page],
    queryFn: getMyComments,
    placeholderData: keepPreviousData,
    retry: 0,
  })

  const notificationList = data?.result?.content;

  return (
    <div className="flex flex-col">
      <div className="max-lg:hidden flex justify-between items-center py-3 px-4 border-b border-solid border-gray-300 text-subhead1-sb text-gray-500">
        <p className="flex-1 text-center">댓글</p>
        <p className="w-[60px] text-center">등록일</p>
      </div>

      {notificationList?.map((notification: Notification, index: number) => {
        return (
          <div key={index} className={`flex gap-2`}>
            <div className={`grow`}>
              <MyNotificationItem
                postId={notification.postId}
                postTitle={notification.postTitle}
                commentWriter={notification.commentWriter}
                commentContent={notification.commentContent}
                createdAt={notification.createdAt}
              />
            </div>
          </div>
        );
      })}
      {!isPending &&
        <div className={`lg:mt-12 mt-8`}>
          <PageNavigator page={page} totalPage={data?.result?.totalPages} isFirst={data?.result?.first} isLast={data?.result?.last} setPage={setPage} />
        </div>
      }
    </div>
  );
};

export default MyNotificationList;
