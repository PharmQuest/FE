interface postItemProps {
  isBest?: boolean;
  subject: string;
  title: string;
  writer: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  scraps: number;
}

const postItem: postItemProps = {
  isBest: true,
  subject: "병원",
  title: "미국 여행 중 병원 가 본 사람 계신가요?",
  writer: "sweety123",
  date: "2024.12.25",
  content:
    "제가 지금 LA에 있는 데 어제부터 머리가 너무 아파서 한국에서 챙겨온 약을 먹었는 데도 효과가 없어서요. 이렇게 머리가 계속해서 아팠던 적은 없는데 불안해져서 병원을 가야 하나 싶어요....... 미국 병원비 엄청 비싸다는 데 전 영어도 잘 못하고 아무런 정보도 몰라서요 미국 여행 중에 병원 가본 적 있으신 분 계시면 그 때 어떻게 하셨는 지 궁금합니다!!!!",
  likes: 12,
  comments: 4,
  scraps: 8,
};

export default postItem;
