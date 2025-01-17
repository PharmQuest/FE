interface PostItemProps {
  id: string;
  isBest: boolean;
  subject: string;
  title: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  scraps: number;
}

const popularPosts: PostItemProps[] = [
  {
    id: "1",
    isBest: true,
    subject: "자유주제",
    title: "배 아플 때 이거 먹어도 되나요?",
    author: "sweety123",
    date: "2024.12.25",
    likes: 99,
    comments: 12,
    scraps: 34,
  },
  {
    id: "2",
    isBest: false,
    subject: "영양제",
    title: "영양제 추천 리스트입니다 ~",
    author: "egeoi12f",
    date: "2024.12.25",
    likes: 99,
    comments: 12,
    scraps: 34,
  },
  {
    id: "3",
    isBest: false,
    subject: "약국",
    title: "약국 약사님이 엄청 친절하시더라구요. 여기까지만 나오게 해주세요...",
    author: "wgew",
    date: "2024.12.12",
    likes: 0,
    comments: 9,
    scraps: 5,
  },
  {
    id: "4",
    isBest: false,
    subject: "병원",
    title: "***역 인근 병원 좀 추천해주세요!!!",
    author: "mbticute",
    date: "2024.12.9",
    likes: 0,
    comments: 9,
    scraps: 2,
  },
  {
    id: "5",
    isBest: false,
    subject: "증상",
    title: "목 아플 때 @@약 드셔보신 분 계신가요?",
    author: "naim89",
    date: "2024.12.25",
    likes: 12,
    comments: 24,
    scraps: 2,
  },
  {
    id: "6",
    isBest: false,
    subject: "증상",
    title: "목 아플 때 @@약 드셔보신 분 계신가요?",
    author: "naim89",
    date: "2024.12.25",
    likes: 12,
    comments: 24,
    scraps: 2,
  },
  {
    id: "7",
    isBest: false,
    subject: "증상",
    title: "목 아플 때 @@약 드셔보신 분 계신가요?",
    author: "naim89",
    date: "2024.12.25",
    likes: 12,
    comments: 24,
    scraps: 2,
  },
  {
    id: "8",
    isBest: false,
    subject: "증상",
    title: "목 아플 때 @@약 드셔보신 분 계신가요?",
    author: "naim89",
    date: "2024.12.25",
    likes: 12,
    comments: 24,
    scraps: 2,
  },
  {
    id: "9",
    isBest: false,
    subject: "증상",
    title: "목 아플 때 @@약 드셔보신 분 계신가요?",
    author: "naim89",
    date: "2024.12.25",
    likes: 12,
    comments: 24,
    scraps: 2,
  },
  {
    id: "10",
    isBest: false,
    subject: "증상",
    title: "목 아플 때 @@약 드셔보신 분 계신가요?",
    author: "naim89",
    date: "2024.12.25",
    likes: 12,
    comments: 24,
    scraps: 2,
  },
];

export default popularPosts;
