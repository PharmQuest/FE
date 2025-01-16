interface CommentItemProps {
  id: string;
  writer: string;
  content: string;
  date: string;
  likes: number;
  parentId?: string;
}

const CommentItem: CommentItemProps[] = [
  {
    id: "1",
    writer: "dkssudskdi",
    content:
      "잘 알아보고 가셔야해요. 미국 병원은 정말 극과 극이라.... 저는 LA갔을 때 GHhospital갔었는 데 20년 전이라 아직도 있는 지는 모르겠어요. 한번 검색해보세요. 괜찮았어요 저는~",
    date: "2024.12.25.",
    likes: 2,
  },
  {
    id: "2",
    writer: "sweety123",
    content: "감사합니다람쥐렁이.",
    date: "2024.12.25.",
    likes: 0,
    parentId: "1",
  },
  {
    id: "3",
    writer: "Maengssso_",
    content: "다녀오셨으면 후기 한번 부탁드립닏당당구리숭당당....",
    date: "2024.12.25.",
    likes: 1,
    parentId: "2",
  },
  {
    id: "4",
    writer: "dkssudskdi",
    content:
      "잘 알아보고 가셔야해요. 미국 병원은 정말 극과 극이라.... 저는 LA갔을 때 GHhospital갔었는 데 20년 전이라 아직도 있는 지는 모르겠어요. 한번 검색해보세요. 괜찮았어요 저는~",
    date: "2024.12.25.",
    likes: 2,
  },
];

export default CommentItem;
