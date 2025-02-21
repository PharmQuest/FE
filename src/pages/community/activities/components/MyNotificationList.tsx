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

  const getMyNotifications = async () => {
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
    queryKey: ["myNotifications", page],
    queryFn: getMyNotifications,
    placeholderData: keepPreviousData,
    retry: 0,
  })

  const notificationList = data?.result?.content;

  return (
    notificationList?.length > 0 ? (
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
    ) : (
      <div className={`
      lg:text-headline-m
      min-h-full text-gray-300 text-center m-auto grow content-center text-m-body2-r`}>
        <p>알림이 없어요. <br/> 관심 있는 게시글에 댓글을 남겨보세요!</p>
      </div>
    )
  );
};

export default MyNotificationList;
