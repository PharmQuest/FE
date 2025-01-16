export const USER_NAVBAR_ITEMS = [
  {
    text: "마이페이지",
    path: "/mypage",
  },
  {
    text: "작성한 게시글",
    path: "/community/activities",
    activePath: "posts",
  },
  {
    text: "작성한 댓글",
    path: "/community/activities",
    activePath: "comments",
  },
  {
    text: "게시글 스크랩",
    path: "/community/activities",
    activePath: "scraps",
  },
  {
    text: "알림",
    path: "/community/activities",
    activePath: "notifications",
  },
] as const;

export type UserNavbarItem = (typeof USER_NAVBAR_ITEMS)[number];
