interface PopularPostItemProps {
  subject: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  scraps: number;
}

const popularPosts: PopularPostItemProps[] = [
  {
    subject: "자유주제",
    title: "효과 직방이었던 꿀팁 알려드릴게요^^",
    content:
      "저희 애 아플 때 먹였던 건데 꿀팁이랑 같이 알려드려요~ 일단 000 성분 들어간 000 약 처방 받으셨으면 준...",
    date: "2024.12.25",
    likes: 99,
    comments: 22,
    scraps: 71,
  },
  {
    subject: "영양제",
    title: "제가 아끼는 영양제예요...",
    content: "영양제 추천 리스트인데 스크랩 안 하면 바보 멍청이 말미잘.",
    date: "2024.12.25",
    likes: 99,
    comments: 22,
    scraps: 9,
  },
  {
    subject: "증상",
    title: "이 증상 나타나면 바로 병원 가삼 왜냐고? 나도 알고 싶지 않았음",
    content: "내용내용내용",
    date: "2024.12.25",
    likes: 99,
    comments: 4,
    scraps: 7,
  },
];

export default popularPosts;
